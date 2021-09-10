import redis from 'redis';
import { promisify } from 'util';
import { Storage } from '../domain/Storage';
import getConfig from './config';

const redisConfig = getConfig().redis;

function valueToRedisMap(value: Record<string, any>) {
  return Object.entries(value).reduce(
    (result, item) => [...result, ...item] as any,
    []
  );
}

interface RedisClientHmset {
  (
    arg1: string | [string, ...(string | number)[]],
    ...otherArgs: any[]
  ): Promise<'OK'>;
}
type AsyncRedisClient = {
  exists(key: string): Promise<number>;
  hmset: RedisClientHmset;
  hgetall: (arg1: string) => Promise<{
    [key: string]: string;
  }>;
  keys(pattern: string): Promise<string[]>;
  expire(key: string, seconds: number): Promise<number>;
};

function createAsyncRedisClient(
  options: ThisType<typeof redisConfig>
): AsyncRedisClient {
  const client = redis.createClient(options);

  // TODO: Find a better way for typing
  const hmset = promisify(
    client.hmset.bind(client)
  ) as AsyncRedisClient['hmset'];

  return {
    exists: promisify(client.exists.bind(client)),
    hgetall: promisify(client.hgetall.bind(client)),
    keys: promisify(client.keys.bind(client)),
    expire: promisify(client.expire.bind(client)),
    hmset
  };
}

export class RedisStorage<TStore extends object> implements Storage<TStore> {
  constructor(
    private name: string,
    private client: AsyncRedisClient = createAsyncRedisClient({
      host: redisConfig.host
    })
  ) {}

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(this.fullKey(key));

    return result === 1;
  }

  async set(key: string, value: TStore, ttlSeconds?: number): Promise<void> {
    const ttl = ttlSeconds ?? -1;
    await this.client.hmset(this.fullKey(key), valueToRedisMap(value));
    await this.client.expire(key, ttl);
  }

  async get(key: string): Promise<TStore | undefined> {
    const data = await this.client.hgetall(this.fullKey(key));
    if (!data) {
      return undefined;
    }

    return data as TStore;
  }

  async keys(): Promise<string[] | undefined> {
    const keys = await this.client.keys(`${this.name}_*`);
    if (!keys) {
      return undefined;
    }

    return keys;
  }

  private fullKey(key: string) {
    return `${this.name}_${key}`;
  }
}
