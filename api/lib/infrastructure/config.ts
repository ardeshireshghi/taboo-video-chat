import dotenv from 'dotenv';
import { StorageType } from '../domain/Storage';

dotenv.config();

function getConfig() {
  const { privateKey: jwtPrivateKey } = JSON.parse(
    process.env.JWT_PRIVATE_KEY as string
  );
  const config = {
    serverPort: process.env.SERVICE_PORT || 8001,
    shortenedUrlProtocol: process.env.SHORTENED_PROTOCOL || 'http',
    urlCacheStoreType: process.env.URL_CACHE_STORE_TYPE || StorageType.Memory,
    jwtPrivateKey,
    mailerApiKey: process.env.MAILER_API_KEY,
    webAppUrl: process.env.WEB_APP_URL,
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }
  };

  return config;
}

export default getConfig;
