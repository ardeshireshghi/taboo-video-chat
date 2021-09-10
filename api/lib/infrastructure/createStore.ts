import { Storage, StorageType } from '../domain/Storage';
import { MemoryStorage } from './memoryStore';
import { RedisStorage } from './redisStore';

export function createStore<TStore extends object>(
  storeType: StorageType,
  name: string
): Storage<TStore> {
  if (storeType === StorageType.Redis) {
    return new RedisStorage<TStore>(name);
  }

  if (storeType === StorageType.Memory) {
    return new MemoryStorage<TStore>(name);
  }

  throw new Error(`Invalid storeType ${storeType}`);
}
