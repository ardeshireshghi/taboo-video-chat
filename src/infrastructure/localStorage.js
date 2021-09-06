export const LocalStorage = {
  set(key, value) {
    localStorage.setItem(key, value);
  },

  get(key) {
    return localStorage.getItem(key);
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};
