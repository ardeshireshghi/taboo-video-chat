export interface Storage<T> {
  exists(key: string, value?: string): boolean | Promise<boolean>;
  set(key: string, value: T, ttlSeconds?: number): void;
  get(key: string, extraParams?: any): T | undefined | Promise<T | undefined>;
  keys(): string[] | Promise<string[] | undefined>;
  getFromBeginningOfList?(key: string, start: number, stop: number);
  removeListFirstItem?(key: string): Promise<any>;
}

export enum StorageType {
  Memory = 'memory',
  Redis = 'redis'
}
