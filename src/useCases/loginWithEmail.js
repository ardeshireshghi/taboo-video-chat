export async function loginWithEmail({ email }) {
  try {
    const response = await fetch('http://localhost:8001/api/v1/email-login', {
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
