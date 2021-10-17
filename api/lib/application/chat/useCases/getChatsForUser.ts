import { Chat, ChatState } from '../../../domain/Chat';

import { Services } from '../../../infrastructure/service-locator';
import { CHAT_TTL } from './constants';

export async function getUserChats(
  userId: string,
  { userChatStore, chatStore }: Pick<Services, 'userChatStore' | 'chatStore'>
): Promise<Chat[] | undefined> {
  const chatTtlMilliseconds = CHAT_TTL * 1000;
  const chatIdsAndScores = await userChatStore.get(userId, {
    min: Date.now() - chatTtlMilliseconds,
    max: Date.now()
  });

  let chats = chatIdsAndScores.reduce((result, chatIdOrScore, index) => {
    if (index % 2 === 0) {
      result[chatIdOrScore] = {
        id: chatIdOrScore
      };
    }
    return result;
  }, {});

  await Promise.all(
    Object.keys(chats).map(async (chatId) => {
      const rawChat = await chatStore.get(chatId);

      if (rawChat) {
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
          joinedUsers: rawChat.joinedUsers
            ? JSON.parse(String(rawChat?.joinedUsers))
            : {},
          state: rawChat.state || ChatState.Pending
        };

        chats[chatId] = {
          ...chats[chatId],
          ...parsedChat
        };
      }

      return chats[chatId];
    })
  );

  const chatListUnsorted = Object.values(chats) as Chat[];

  // Return sorted by last created
  return chatListUnsorted.sort((a, b) => {
    return a.createdAt! > b.createdAt! ? -1 : 1;
  });
}
