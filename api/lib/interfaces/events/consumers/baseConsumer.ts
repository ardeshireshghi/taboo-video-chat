import { PubSubMessage } from '../../../domain/interfaces/pubsub/PubSubMessage';
import { RedisSubscriber } from '../../../infrastructure/pubSub';

export abstract class BaseConsumer {
  constructor(public topicName: string, public subscriber: RedisSubscriber) {}

  consume() {
    this.subscriber.subscribe({
      topicName: this.topicName
    });
    this.subscriber.connect();

    this.subscriber.run({
      onMessage: (topicName, message) => {
        if (topicName === this.topicName) {
          this.process(message);
        }
      }
    });
  }

  abstract process(message: PubSubMessage);
}
