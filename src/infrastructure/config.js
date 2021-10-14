const CONFIG_GLOBAL_KEY = '__RUNTIME_CONFIG__';
let config = {};

export function getConfig() {
  if (!(CONFIG_GLOBAL_KEY in window)) {
    return config;
  }

  if (Object.keys(config).length === 0) {
    config = {
      apiBaseUrl: window[CONFIG_GLOBAL_KEY].REACT_APP_API_URL,
      chatPollIntervalSeconds:
        window[CONFIG_GLOBAL_KEY].CHAT_POLL_INTERVAL || 10,
      chatPollingTimeSeconds: 300
    };

    delete window[CONFIG_GLOBAL_KEY];
  }

  return config;
}
