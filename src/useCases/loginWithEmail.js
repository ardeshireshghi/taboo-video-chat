import { getConfig } from '../infrastructure/config';

export async function loginWithEmail({ email }) {
  try {
    const config = getConfig();

    if (!config.apiBaseUrl) {
      throw new Error('apiBaseUrl is not set in config');
    }

    const response = await fetch(`${config.apiBaseUrl}/api/v1/magic-login`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Error making request to login user');
    }
  } catch (err) {
    console.error('Error sending email link to user', err);
    throw err;
  }
}
