import { Chat } from '../domain/Chat';
import { Topic } from '../domain/Topic';

import { getConfig } from '../infrastructure/config';

function toDomain(chats) {
  return chats.map((chat) => {
    const topic = new Topic(chat.topic.id, chat.topic.name);

    return new Chat(chat.id, {
      ...chat,
      topic
    });
  });
}
export async function getUserChats(authService) {
  try {
    const config = getConfig();
    const accessToken = authService.getToken().value;

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is not set in config');
    }

    const response = await fetch(`${config.apiBaseUrl}/api/v1/chat`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Error making request to fetch user chats');
    }
    const chats = await response.json();

    return toDomain(chats);
  } catch (err) {
    console.error('Error fetching chats', err);
    throw err;
  }
}
