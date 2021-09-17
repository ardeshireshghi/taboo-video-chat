import { createChat } from '../../../application/useCases/createChat';
import { PubSubMessage } from '../../../domain/interfaces/pubsub/PubSubMessage';
import services from '../../../infrastructure/service-locator';
import { EventTopics } from '../topics';

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

async function processTopicUpdated(message: PubSubMessage) {
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
      if (firstQueueItem.userId !== nextQueueItem.userId) {
        shouldCreateChat = true;
        break;
      } else {
        const nextTopicQueueItem = await getNextTopicQueueItem(
          topicId,
          nextQueueItemIndex,
          { topicQueueStore, topicQueueItemStore }
        );

        queueItemCache.push(nextTopicQueueItem);

        if (!nextTopicQueueItem) {
          shouldCreateChat = false;
          break;
        } else {
          nextQueueItem = nextTopicQueueItem;
          nextQueueItemIndex += 1;
          continue;
        }
      }
    } else if (!firstQueueItem && nextQueueItem) {
      firstQueueItem = nextQueueItem;

      const nextTopicQueueItem = await getNextTopicQueueItem(
        topicId,
        nextQueueItemIndex,
        { topicQueueStore, topicQueueItemStore }
      );

      queueItemCache.push(nextTopicQueueItem);

      if (!nextTopicQueueItem) {
        shouldCreateChat = false;
        break;
      } else {
        nextQueueItem = nextTopicQueueItem;
        nextQueueItemIndex += 1;
        continue;
      }
    } else if (!firstQueueItem && !nextQueueItem) {
      shouldCreateChat = false;
      break;
    }
  }

  if (shouldCreateChat) {
    // Remove items from queue
    for (const item of queueItemCache) {
      await topicQueueStore.removeListFirstItem?.(topicId);
    }

    const chat = await createChat(
      {
        topic: {
          id: topicId,
          name: firstQueueItem.name
        },
        users: [firstQueueItem.userId, nextQueueItem.userId]
      },
      { chatStore: services.chatStore, userChatStore: services.userChatStore }
    );

    console.log('Boom new video chat created', chat);
  }
}

function createConsumer() {
  const subscriber = pubsub.subscriber();

  subscriber.subscribe({
    topicName: EventTopics.TopicUpdated
  });
  subscriber.connect();

  subscriber.run({
    onMessage(topicName, message) {
      switch (topicName) {
        case EventTopics.TopicUpdated:
          processTopicUpdated(message);
          break;

        default:
      }
    }
  });

  console.log(`Subscribed to topic '${EventTopics.TopicUpdated}'`);
}

export default createConsumer;
