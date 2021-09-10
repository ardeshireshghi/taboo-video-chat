const CONFIG_GLOBAL_KEY = '__RUNTIME_CONFIG__';
let config = {};

export function getConfig() {
  if (!(CONFIG_GLOBAL_KEY in window)) {
    return {};
  }

  if (Object.keys(config).length === 0) {
    config = {
      apiBaseUrl: window[CONFIG_GLOBAL_KEY].REACT_APP_API_URL
    };

    delete window[CONFIG_GLOBAL_KEY];
  }

  return config;
}
