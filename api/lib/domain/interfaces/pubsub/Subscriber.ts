import { PubSubMessage } from './PubSubMessage';

export type SubscribeParams = {
  topicName: string;
};

export interface Subscriber {
  subscribe({ topicName }: SubscribeParams): void;
  run({
    onMessage
  }: {
    onMessage: (topicName: string, message: PubSubMessage) => void;
  }): void;
  connect(): void;
}
