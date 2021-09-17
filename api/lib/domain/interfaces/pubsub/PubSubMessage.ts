export interface PubSubMessage<TMessage = any> {
  value: Record<string, TMessage> | string | number;
}
