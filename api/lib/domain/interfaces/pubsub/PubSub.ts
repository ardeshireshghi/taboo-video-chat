import { Publisher } from './Publisher';
import { Subscriber } from './Subscriber';

export interface PubSub {
  publisher(): Publisher;
  subscriber(): Subscriber;
}
