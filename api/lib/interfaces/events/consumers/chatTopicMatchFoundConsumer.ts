import { createChat } from '../../../application/chat/useCases/createChat';
import { ChatState } from '../../../domain/Chat';
import { PubSubMessage } from '../../../domain/interfaces/pubsub/PubSubMessage';
import { Topic } from '../../../domain/Topic';
import services from '../../../infrastructure/service-locator';
import { EventTopics } from '../topics';
import { BaseConsumer } from './baseConsumer';

const { pubsub } = services;

class ChatTopicMatchFoundConsumer extends BaseConsumer {
  constructor() {
    super(EventTopics.ChatTopicMatchFound, pubsub.subscriber());
  }

  async process(message: PubSubMessage) {
    console.log(
      `chatTopicMatchFound consumer received event with topic ${EventTopics.ChatTopicMatchFound}`,
      message
    );

    const { topic, userIds } = message.value as {
      topic: Topic;
      userIds: string[];
    };

    const chat = await createChat(
      {
        topic,
        users: userIds,
        state: ChatState.Pending,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      { chatStore: services.chatStore, userChatStore: services.userChatStore }
    );

    console.log('Boom new video chat created', chat);
  }
}

function createConsumer() {
  const topicUpdatedConsumer = new ChatTopicMatchFoundConsumer();
  topicUpdatedConsumer.consume();

  console.log(`Subscribed to topic '${EventTopics.ChatTopicMatchFound}'`);
}

export default createConsumer;
