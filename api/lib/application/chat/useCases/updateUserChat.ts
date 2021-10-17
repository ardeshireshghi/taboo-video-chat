import { Chat, ChatState } from '../../../domain/Chat';
import { ApiError } from '../../../domain/errors/ApiError';
import { Services } from '../../../infrastructure/service-locator';
import { CHAT_TTL, CHAT_FULLFILLED_JOIN_DIFF_SECONDS } from './constants';

export async function updateChat(
  userId: string,
  chatId: string,
  { chatStore }: Pick<Services, 'chatStore'>
): Promise<Chat | undefined> {
  const rawChat = await chatStore.get(chatId);

  if (!rawChat) {
    return;
  }

  const parsedChat = {
    id: rawChat?.id,
    topic:
      rawChat?.topic && typeof rawChat?.topic === 'string'
        ? JSON.parse(rawChat?.topic)
        : rawChat?.topic,
    users:
      rawChat?.users && typeof rawChat?.users === 'string'
        ? JSON.parse(rawChat?.users)
        : rawChat?.users,
    createdAt: rawChat.createdAt,
    updatedAt: rawChat.updatedAt,
    state: rawChat.state,
    joinedUsers: rawChat.joinedUsers
      ? JSON.parse(String(rawChat?.joinedUsers))
      : {}
  };

  if (!parsedChat.users.includes(userId)) {
    throw new ApiError(
      `User with id ${userId} does not have permission for this operation`,
      401
    );
  }

  const joinedUserIds = Object.keys(parsedChat.joinedUsers);

  parsedChat.joinedUsers[userId] = {
    lastJoinedAt: new Date().toISOString()
  };

  const joinedUsersCopy = { ...parsedChat.joinedUsers } as Chat['joinedUsers'];
  if (joinedUsersCopy && userId in joinedUsersCopy) {
    delete joinedUsersCopy[userId];
  }

  parsedChat.state =
    joinedUsersCopy &&
    joinedUserIds.length > 1 &&
    Math.abs(
      Date.parse(parsedChat.joinedUsers[userId].lastJoinedAt) -
        Date.parse(Object.values(joinedUsersCopy)[0].lastJoinedAt)
    ) /
      1000 <
      CHAT_FULLFILLED_JOIN_DIFF_SECONDS
      ? ChatState.Fullfilled
      : ChatState.PartialJoin;

  const updatedChatTTL =
    CHAT_TTL -
    Math.floor((Date.now() - Date.parse(parsedChat?.createdAt!)) / 1000);

  // Update chat
  await chatStore.set(chatId, parsedChat, updatedChatTTL);

  return parsedChat;
}
