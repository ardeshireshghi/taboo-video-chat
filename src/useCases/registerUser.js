import { AccessToken } from '../domain/AccessToken';
import { User } from '../domain/User';
import { getConfig } from '../infrastructure/config';

export async function registerUser({ email, name }) {
  try {
    const config = getConfig();

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is not set in config');
    }

    const response = await fetch(`${config.apiBaseUrl}/api/v1/user`, {
      method: 'POST',
      body: JSON.stringify({ email, name }),
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Error making request to register user');
    }
    const { token, id } = await response.json();
    return new User(id, name, email, new AccessToken(token));
  } catch (err) {
    console.error('Error registering user', err);
    throw err;
  }
}
