import { Storage, StorageType } from '../domain/Storage';
import { MemoryStorage } from './memoryStore';
import { RedisStorage, StoreValueRedisType } from './redisStore';

export function createStore<TStore extends object>(
  storeType: StorageType,
  name: string,
  storeValueType?: StoreValueRedisType | string
): Storage<TStore> {
  if (storeType === StorageType.Redis) {
    return new RedisStorage<TStore>(
      name,
      storeValueType as StoreValueRedisType
    );
  }

  if (storeType === StorageType.Memory) {
    return new MemoryStorage<TStore>(name);
  }

  throw new Error(`Invalid storeType ${storeType}`);
}
