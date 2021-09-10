import { ApiUser } from '../domain/api/User';
import { getConfig } from '../infrastructure/config';

const apiUserFromResponse = async (response) =>
  new ApiUser(await response.json());

function createRequestInit(data, method = 'POST') {
  return {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  };
}

export async function login({ email, loginToken }) {
  try {
    const config = getConfig();

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is not set in config');
    }
    const response = await fetch(
      `${config.apiBaseUrl}/api/v1/login`,
      createRequestInit({ email, loginToken })
    );

    if (!response.ok) {
      console.error(response);
      throw new Error('Error making request to register user');
    }

    return await apiUserFromResponse(response);
  } catch (err) {
    console.error('Error logging in user with token', err);
    throw err;
  }
}
