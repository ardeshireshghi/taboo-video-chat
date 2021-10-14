import { Topic } from '../domain/Topic';

import { getConfig } from '../infrastructure/config';

export async function createTopic({ name }, authService) {
  try {
    const config = getConfig();
    const accessToken = authService.getToken().value;

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is not set in config');
    }

    const response = await fetch(`${config.apiBaseUrl}/api/v1/topic`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Error making request to create topic');
    }
    const { id, name: topicName } = await response.json();
    return new Topic(id, topicName);
  } catch (err) {
    console.error('Error creating topic', err);
    throw err;
  }
}
