export interface Storage<T> {
  exists(key: string): boolean | Promise<boolean>;
  set(key: string, value: T, ttlSeconds?: number): void;
  get(key: string): T | undefined | Promise<T | undefined>;
  keys(): string[] | Promise<string[] | undefined>;
  getLastFromList?(key: string): Promise<void>;
}

export enum StorageType {
  Memory = 'memory',
  Redis = 'redis'
}
