import { AccessToken } from '../domain/AccessToken';
import { User } from '../domain/User';
import { login as loginApi } from '../interfaces/apiAdapter';

const mapApiUserToDomain = (apiUser) =>
  new User(
    apiUser.id,
    apiUser.name,
    apiUser.email,
    new AccessToken(apiUser.token)
  );

function getParamsFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const params = Object.fromEntries(urlParams.entries());

  if (!params.loginToken || !params.email) {
    throw new Error('loginToken and/or email are not in the url');
  }

  return {
    loginToken: params.loginToken,
    email: params.email
  };
}

export async function loginUserWithToken() {
  try {
    const apiUser = await loginApi(getParamsFromUrl());
    return mapApiUserToDomain(apiUser);
  } catch (err) {
    console.error('Error logging user in', err);
    throw err;
  }
}
