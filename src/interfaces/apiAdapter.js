import { ApiUser } from '../domain/api/User';

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
    const response = await fetch(
      'http://localhost:8001/api/v1/login',
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
