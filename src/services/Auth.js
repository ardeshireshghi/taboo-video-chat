import { AccessToken } from '../domain/AccessToken';
import { LocalStorage } from '../infrastructure/localStorage';

const TOKEN_STORAGE_KEY = 'taboo_accesstoken';

export class Auth {
  constructor(user = null, token = null) {
    this.user = user;
    this.token = token;

    this.decodeToken();
  }

  setToken(token) {
    LocalStorage.set(TOKEN_STORAGE_KEY, token.value);
    this.token = token;

    this.decodeToken();
  }

  decodeToken() {
    try {
      this.token =
        this.token !== null
          ? this.token
          : new AccessToken(LocalStorage.get(TOKEN_STORAGE_KEY));

      if (this.token.value) {
        this.user = JSON.parse(atob(this.token.value.split('.')[1]));
      }
    } catch (err) {
      console.error('Error decoding user access token');
      throw err;
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    LocalStorage.remove(TOKEN_STORAGE_KEY);
  }

  isAuthenticated() {
    return (
      this.user && Math.floor(new Date().getTime() / 1000) <= this.user.exp
    );
  }

  getUserInfo() {
    if (!this.user) {
      return null;
    }

    return this.user.context.user;
  }
}
