import { EmailNotificationGateway } from '../domain/gateways/EmailNotification';
import { Storage } from '../domain/Storage';
import { createEmailNotificationGateway } from '../interfaces/gateways/emailNotification';

import getConfig from './config';
import { EmailMailer } from './mailer';
import { createStore, StorageType } from './store';

const { urlCacheStoreType } = getConfig();

export interface Services {
  userStore: Storage<any>;
  emailNotification: EmailNotificationGateway;
}

export function buildServices(): Services {
  return {
    userStore: createStore<any>(urlCacheStoreType as StorageType, 'users'),
    emailNotification: createEmailNotificationGateway({
      mailer: new EmailMailer()
    })
  };
}

export default buildServices();
