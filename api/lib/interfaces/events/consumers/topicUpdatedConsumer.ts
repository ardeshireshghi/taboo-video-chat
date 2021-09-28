import { createChat } from '../../../application/useCases/createChat';
import { PubSubMessage } from '../../../domain/interfaces/pubsub/PubSubMessage';
import services from '../../../infrastructure/service-locator';
import { EventTopics } from '../topics';
import { BaseConsumer } from './baseConsumer';

const { pubsub, topicQueueStore, topicQueueItemStore } = services;

async function getNextTopicQueueItem(
  topicId,
  index,
  { topicQueueStore, topicQueueItemStore }
) {
  const nextTopicQueueItemId = await topicQueueStore.getFromBeginningOfList?.(
    topicId,
    index,
    index
  );

  if (nextTopicQueueItemId.length === 0) {
    return undefined;
  }

  return await topicQueueItemStore.get(nextTopicQueueItemId[0]);
}

class TopicUpdatedConsumer extends BaseConsumer {
  constructor(public chatTopicMatchFoundPublisher = pubsub.publisher()) {
    super(EventTopics.TopicUpdated, pubsub.subscriber());
  }

  async process(message: PubSubMessage) {
    console.log(
      `topicUpdated consumer received event with topic ${EventTopics.TopicUpdated}`,
      message
    );

    const topicId = message.value as string;

    let shouldCreateChat = false;
    let firstQueueItem;
    let nextQueueItem;

    let nextTwotopicQueueItems = await topicQueueStore.getFromBeginningOfList?.(
      topicId,
      0,
      1
    );

    // When there are not enough items in the queue
    if (nextTwotopicQueueItems.length < 2) {
      console.log('Not enough queue items in the topic to create a chat');
      return;
    }

    let nextQueueItemIndex = 2;
    const queueItemCache: any[] = [];

    firstQueueItem = await topicQueueItemStore.get(nextTwotopicQueueItems[0]);
    nextQueueItem = await topicQueueItemStore.get(nextTwotopicQueueItems[1]);

    queueItemCache.push(firstQueueItem, nextQueueItem);

    while (true) {
      if (firstQueueItem && nextQueueItem) {
        // Two valid queue items with different user ids
        if (firstQueueItem.userId !== nextQueueItem.userId) {
          shouldCreateChat = true;
          break;
        }

        const nextTopicQueueItem = await getNextTopicQueueItem(
          topicId,
          nextQueueItemIndex,
          { topicQueueStore, topicQueueItemStore }
        );

        queueItemCache.push(nextTopicQueueItem);

        // if there is no next item in the queue we are done
        if (!nextTopicQueueItem) {
          break;
        }

        nextQueueItem = nextTopicQueueItem;
        nextQueueItemIndex += 1;
        continue;
      } else if (!firstQueueItem && nextQueueItem) {
        firstQueueItem = nextQueueItem;

        const nextTopicQueueItem = await getNextTopicQueueItem(
          topicId,
          nextQueueItemIndex,
          { topicQueueStore, topicQueueItemStore }
        );

        queueItemCache.push(nextTopicQueueItem);

        if (!nextTopicQueueItem) {
          break;
        }

        nextQueueItem = nextTopicQueueItem;
        nextQueueItemIndex += 1;
        continue;
      }
    }

    if (shouldCreateChat) {
      // Remove items from queue
      for (const item of queueItemCache) {
        await topicQueueStore.removeListFirstItem?.(topicId);
      }

      console.log('Publishing chatTopicMatchFound for topic', topicId);
      this.chatTopicMatchFoundPublisher.publish({
        topic: EventTopics.ChatTopicMatchFound,
        message: {
          value: {
            topic: {
              id: topicId,
              name: firstQueueItem.name
            },
            userIds: [firstQueueItem.userId, nextQueueItem.userId]
          }
        }
      });
    }
  }
}

function createConsumer() {
  const topicUpdatedConsumer = new TopicUpdatedConsumer();
  topicUpdatedConsumer.consume();

  console.log(`Subscribed to topic '${EventTopics.TopicUpdated}'`);
}

export default createConsumer;
