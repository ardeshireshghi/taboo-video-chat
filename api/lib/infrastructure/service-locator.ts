import { EmailNotificationGateway } from '../domain/gateways/EmailNotification';
import { Storage } from '../domain/Storage';
import { User } from '../domain/User';
import { createEmailNotificationGateway } from '../interfaces/gateways/emailNotification';

import getConfig from './config';
import { EmailMailer } from './mailer';
import { createStore, StorageType } from './memoryStore';

const { urlCacheStoreType } = getConfig();

export interface Services {
  userStore: Storage<User>;
  emailNotification: EmailNotificationGateway;
}

export function buildServices(): Services {
  return {
    userStore: createStore<User>(urlCacheStoreType as StorageType, 'users'),
    emailNotification: createEmailNotificationGateway({
      mailer: new EmailMailer()
    })
  };
}

export default buildServices();
