import redis from 'redis';
import {
  Publisher,
  PublishParams
} from '../domain/interfaces/pubsub/Publisher';
import { PubSub } from '../domain/interfaces/pubsub/PubSub';
import { PubSubMessage } from '../domain/interfaces/pubsub/PubSubMessage';
import {
  SubscribeParams,
  Subscriber
} from '../domain/interfaces/pubsub/Subscriber';
import getConfig from './config';

function createRedisClient() {
  return redis.createClient({
    host: getConfig().redis.write.host
  });
}

export class RedisSubscriber implements Subscriber {
  private onMessage: (topicName: string, message: PubSubMessage) => void =
    () => {};

  constructor(public subscriber: redis.RedisClient = createRedisClient()) {}

  async subscribe({ topicName }: SubscribeParams) {
    this.subscriber.subscribe(topicName);
  }

  connect() {
    this.subscriber.on('subscribe', (topicName) => {
      console.log('Redis subscriber subscribed to a new topic', topicName);
    });

    this.subscriber.on('message', (topicName: string, message: any) => {
      this.onMessage(topicName, JSON.parse(message));
    });
  }

  run({
    onMessage
  }: {
    onMessage: (topicName: string, message: PubSubMessage) => void;
  }) {
    this.onMessage = onMessage;
  }
}

export class RedisPublisher implements Publisher {
  constructor(public publisher: redis.RedisClient = createRedisClient()) {}

  async publish({ topic, message }: PublishParams<any>) {
    this.publisher?.publish(
      topic,
      typeof message === 'string' ? message : JSON.stringify(message)
    );
  }
}

export class RedisPubSub implements PubSub {
  publisher() {
    return new RedisPublisher();
  }
  subscriber() {
    return new RedisSubscriber();
  }
}
