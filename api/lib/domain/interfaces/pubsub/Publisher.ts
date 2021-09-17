import { PubSubMessage } from './PubSubMessage';

export type PublishParams<T> = {
  topic: string;
  message: PubSubMessage<T>;
};

export interface Publisher {
  publish({ topic, message }: PublishParams<any>): void;
}
