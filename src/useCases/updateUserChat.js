import { Chat } from '../domain/Chat';
import { Topic } from '../domain/Topic';

import { getConfig } from '../infrastructure/config';

function apiChatToDomain(chat) {
  const topic = new Topic(chat.topic.id, chat.topic.name);

  return new Chat(chat.id, {
    ...chat,
    topic
  });
}

export async function updateUserChat(chatId, authService) {
  try {
    const config = getConfig();
    const accessToken = authService.getToken().value;

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is not set in config');
    }

    const response = await fetch(`${config.apiBaseUrl}/api/v1/chat/${chatId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(`Error updating user chat id ${chatId}`);
    }
    const updatedChat = await response.json();

    return apiChatToDomain(updatedChat);
  } catch (err) {
    console.error('Error updating chat', err);
    throw err;
  }
}
