import { StorageType } from './store';

import dotenv from 'dotenv';

dotenv.config();

function getConfig() {
  const { privateKey: jwtPrivateKey } = JSON.parse(
    process.env.JWT_PRIVATE_KEY as string
  );
  const config = {
    serverPort: process.env.SERVICE_PORT || 8001,
    shortenedUrlProtocol: process.env.SHORTENED_PROTOCOL || 'http',
    urlCacheStoreType: process.env.URL_CACHE_STORE_TYPE || StorageType.Memory,
    jwtPrivateKey
  };

  return config;
}

export default getConfig;
