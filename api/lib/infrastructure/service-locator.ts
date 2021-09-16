import { EmailNotificationGateway } from '../domain/gateways/EmailNotification';
import { Storage, StorageType } from '../domain/Storage';
import { User } from '../domain/User';
import { createEmailNotificationGateway } from '../interfaces/gateways/emailNotification';

import getConfig from './config';
import { EmailMailer } from './mailer';
import { createStore } from './createStore';
import { Chat } from '../domain/Chat';
import { Topic } from '../domain/Topic';
import { StoreValueRedisType } from './redisStore';

const { cacheStoreType } = getConfig();

export interface Services {
  userStore: Storage<User>;
  topicStore: Storage<Topic>;
  topicUsersStore: Storage<any>;
  topicQueueStore: Storage<any>;
  topicQueueItemStore: Storage<any>;
  chatStore: Storage<Chat>;
  userChatStore: Storage<any>;
  emailNotification: EmailNotificationGateway;
}

export function buildServices(): Services {
  return {
    userStore: createStore<User>(
      cacheStoreType as StorageType,
      'users',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisHashMap
        : undefined
    ),
    topicStore: createStore<Topic>(
      cacheStoreType as StorageType,
      'topics',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisHashMap
        : undefined
    ),
    chatStore: createStore<Chat>(
      cacheStoreType as StorageType,
      'chats',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisHashMap
        : undefined
    ),
    topicUsersStore: createStore<any>(
      cacheStoreType as StorageType,
      'topics_users',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisSet
        : undefined
    ),
    topicQueueStore: createStore<any>(
      cacheStoreType as StorageType,
      'topics_queue',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisList
        : undefined
    ),
    topicQueueItemStore: createStore<any>(
      cacheStoreType as StorageType,
      'topics_queue_item',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisHashMap
        : undefined
    ),
    userChatStore: createStore<any>(
      cacheStoreType as StorageType,
      'users_chats',
      cacheStoreType === StorageType.Redis
        ? StoreValueRedisType.RedisOrderedSet
        : undefined
    ),

    emailNotification: createEmailNotificationGateway({
      mailer: new EmailMailer()
    })
  };
}

export default buildServices();
