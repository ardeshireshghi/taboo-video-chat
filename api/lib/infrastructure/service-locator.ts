import { Storage } from '../domain/Storage';

import getConfig from './config';
import { createStore, StorageType } from './store';

const { urlCacheStoreType } = getConfig();

export interface Services {
  userStore: Storage<any>;
}

export function buildServices(): Services {
  return {
    userStore: createStore<any>(urlCacheStoreType as StorageType, 'users')
  };
}

export default buildServices();
