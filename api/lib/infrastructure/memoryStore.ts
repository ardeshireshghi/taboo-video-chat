import { Storage } from '../domain/Storage';

interface StoreBase {}

type StoreValue<T> = { data: T; ttlSeconds?: number; createdAt: string };

export class MemoryStorage<TStore extends StoreBase>
  implements Storage<TStore>
{
  constructor(
    private name: string,
    private store: Map<string, StoreValue<TStore>> = new Map()
  ) {}

  exists(key: string): Promise<boolean> {
    return Promise.resolve(this.store.has(key));
  }

  set(key: string, value: TStore, ttlSeconds?: number): Promise<void> {
    const ttl = ttlSeconds ?? -1;

    this.store.set(key, {
      ttlSeconds: ttl,
      createdAt: new Date().toISOString(),
      data: value
    });

    return Promise.resolve();
  }

  get(key: string): Promise<TStore | undefined> {
    const value = this.store.get(key);

    if (value && this.isExpired(value)) {
      this.store.delete(key);
      return Promise.resolve(undefined);
    }

    return Promise.resolve(value?.data);
  }

  keys(): Promise<string[] | undefined> {
    return Promise.resolve(Array.from(this.store.keys()));
  }

  private isExpired(value: StoreValue<TStore>) {
    const ttl = value.ttlSeconds ?? -1;

    if (ttl === -1) {
      return false;
    }

    return Math.floor(Date.parse(value.createdAt) / 1000) + ttl > Date.now();
  }
}
