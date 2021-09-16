import { Chat } from '../../domain/Chat';
import { Services } from '../../infrastructure/service-locator';
import { uuid } from '../../infrastructure/uuid';

export async function createChat(
  chat: Omit<Chat, 'id'>,
  { chatStore, userChatStore }: Pick<Services, 'chatStore' | 'userChatStore'>
): Promise<any | undefined> {
  const chatId = uuid();

  const chatWithId: Chat = {
    ...chat,
    id: chatId
  };

  await chatStore.set(chatId, chatWithId, 24 * 3600);

  // Add chatIds to users in the chat
  await Promise.all([
    userChatStore.set(chatWithId.users[0], [Date.now(), chatId]),
    userChatStore.set(chatWithId.users[1], [Date.now(), chatId])
  ]);

  return chatWithId;
}
