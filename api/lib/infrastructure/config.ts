import dotenv from 'dotenv';
import { StorageType } from '../domain/Storage';

dotenv.config();

function getConfig() {
  const { privateKey: jwtPrivateKey } = JSON.parse(
    process.env.JWT_PRIVATE_KEY as string
  );

  const { publicKey: jwtPublicKey } = JSON.parse(
    process.env.JWT_PUBLIC_KEY as string
  );
  const config = {
    serverPort: process.env.SERVICE_PORT || 8001,
    shortenedUrlProtocol: process.env.SHORTENED_PROTOCOL || 'http',
    cacheStoreType: process.env.CACHE_STORE_TYPE || StorageType.Memory,
    jwtPrivateKey,
    jwtPublicKey,
    mailerApiKey: process.env.MAILER_API_KEY,
    webAppUrl: process.env.WEB_APP_URL,
    redis: {
      read: {
        host: process.env.REDIS_FOLLOWER_HOST,
        port: Number(process.env.REDIS_PORT)
      },
      write: {
        host: process.env.REDIS_LEADER_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    },
    jitsiAppId: process.env.JITSI_VIDEO_APP_ID
  };

  return config;
}

export default getConfig;
