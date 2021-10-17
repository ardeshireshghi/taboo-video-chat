// TODO: Explore io-redis
import redis from 'redis';
import { promisify } from 'util';
import { Storage } from '../domain/Storage';
import getConfig from './config';

const redisConfig = getConfig().redis;

function valueToRedisMap(value: Record<string, any>) {
  const result = Object.entries(value).reduce((result, [key, value]) => {
    const valueToStore =
      typeof value === 'object' ? JSON.stringify(value) : value;
    return [...result, ...[key, valueToStore]] as any;
  }, []);

  return result;
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
  sadd(...otherArgs: any[]): Promise<any>;
  zadd(...otherArgs: any[]): Promise<any>;
  rpush(key: string, ...otherArgs: any[]): Promise<any>;
  lpop(key: string): Promise<any>;
  lrange(key: string, start: number, stop: number): Promise<any>;
  zrangebyscore(...args): Promise<any>;
  set(key: string, value: string): Promise<any>;
  keys(pattern: string): Promise<string[]>;
  expire(key: string, seconds: number): Promise<number>;
  sismember(key: string, value: string): Promise<number>;
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
    sadd: promisify(client.sadd.bind(client)),
    zadd: promisify(client.zadd.bind(client)),
    rpush: promisify(client.rpush.bind(client)),
    lrange: promisify(client.lrange.bind(client)),
    zrangebyscore: promisify(client.zrangebyscore.bind(client)),
    lpop: promisify(client.lpop.bind(client)),
    set: promisify(client.set.bind(client)),
    sismember: promisify(client.sismember.bind(client)),
    hmset
  };
}

export enum StoreValueRedisType {
  RedisHashMap = 'hashmap',
  RedisSet = 'set',
  RedisOrderedSet = 'orderedSet',
  RedisList = 'list'
}

const storeValueTypeToSetter = {
  [StoreValueRedisType.RedisHashMap]: 'setHashMap',
  [StoreValueRedisType.RedisSet]: 'appendToSet',
  [StoreValueRedisType.RedisOrderedSet]: 'appendToOrderedSet',
  [StoreValueRedisType.RedisList]: 'appendToList'
};

const storeValueToGetter = {
  [StoreValueRedisType.RedisHashMap]: 'getHashMap',
  [StoreValueRedisType.RedisOrderedSet]: 'getFromOrderedSet'
};
export class RedisStorage<TStore extends object> implements Storage<TStore> {
  constructor(
    private name: string,
    private storeValueRedisType: StoreValueRedisType = StoreValueRedisType.RedisHashMap,
    private readClient: AsyncRedisClient = createAsyncRedisClient({
      host: redisConfig.read.host
    }),
    private writeClient: AsyncRedisClient = createAsyncRedisClient({
      host: redisConfig.write.host
    })
  ) {}

  async exists(key: string, value?: string): Promise<boolean> {
    let result;

    if (this.storeValueRedisType === StoreValueRedisType.RedisSet && value) {
      result = this.readClient.sismember(this.fullKey(key), value);
    } else {
      result = await this.readClient.exists(this.fullKey(key));
    }

    return result === 1;
  }

  async set(key: string, value: TStore, ttlSeconds?: number): Promise<void> {
    const ttl = ttlSeconds ?? -1;

    const setterMethod = storeValueTypeToSetter[this.storeValueRedisType];

    await this[setterMethod](this.fullKey(key), value);
    await this.writeClient.expire(key, ttl);
  }

  async getFromBeginningOfList(
    key: string,
    start: number,
    stop: number
  ): Promise<any> {
    return await this.readClient.lrange(this.fullKey(key), start, stop);
  }

  async removeListFirstItem(key: string): Promise<any> {
    return await this.writeClient.lpop(this.fullKey(key));
  }

  private async appendToSet(key: string, values: any[]): Promise<void> {
    await this.writeClient.sadd(key, ...values);
  }

  private async appendToOrderedSet(
    key: string,
    valuesWithScore: any[]
  ): Promise<void> {
    await this.writeClient.zadd([key, ...valuesWithScore]);
  }

  private async appendToList(key: string, value: any): Promise<void> {
    await this.writeClient.rpush(key, value);
  }

  private async setHashMap(key: string, value: TStore): Promise<void> {
    await this.writeClient.hmset(key, valueToRedisMap(value));
  }

  async get(key: string, extraParams?: any): Promise<TStore | undefined> {
    const getterMethod = storeValueToGetter[this.storeValueRedisType];

    const data = await this[getterMethod](this.fullKey(key), extraParams);

    if (!data) {
      return undefined;
    }

    return data as TStore;
  }

  async getHashMap(key: string) {
    return await this.readClient.hgetall(key);
  }

  async getFromOrderedSet(key: string, scores: { min: number; max: number }) {
    return await this.readClient.zrangebyscore([
      key,
      scores.min,
      scores.max,
      'WITHSCORES'
    ]);
  }

  async keys(): Promise<string[] | undefined> {
    const keys = await this.readClient.keys(`${this.name}_*`);
    if (!keys) {
      return undefined;
    }

    return keys;
  }

  private fullKey(key: string) {
    return `${this.name}_${key}`;
  }
}
