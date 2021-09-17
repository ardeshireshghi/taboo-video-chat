import { Topic } from '../../domain/Topic';
import { createHash } from '../../infrastructure/createHash';
import { RedisPublisher } from '../../infrastructure/pubSub';
import { Services } from '../../infrastructure/service-locator';
import { EventTopics } from '../../interfaces/events/topics';

async function enqueueTopic(
  topic: { id: string; name: string },
  userId,
  stores
) {
  const queueItemId = `${topic.id}:${userId}`;

  await stores.topicQueueItemStore.set(
    queueItemId,
    {
      name: topic.name,
      userId
    },
    24 * 3600 // expire in one day
  );
  await stores.topicQueueStore.set(topic.id, queueItemId);
}

let topicUpdatedPublisher: RedisPublisher;

export async function createTopicAndEnqueue(
  data: {
    name: string;
    userId: string;
  },
  {
    topicStore,
    topicUsersStore,
    topicQueueStore,
    topicQueueItemStore,

    pubsub
  }: Pick<
    Services,
    | 'topicStore'
    | 'topicUsersStore'
    | 'topicQueueStore'
    | 'topicQueueItemStore'
    | 'pubsub'
  >
): Promise<Topic> {
  const { userId, name } = data;
  const topicId = createHash(name);

  topicUpdatedPublisher = topicUpdatedPublisher ?? pubsub.publisher();

  const topic = {
    id: topicId,
    name
  };

  // Add the topic to topic store
  await topicStore.set(topicId, topic);

  // Add user to the set of users following the topic
  await topicUsersStore.set?.(topicId, [userId]);

  // Add topic to queue storages
  await enqueueTopic(topic, userId, {
    topicQueueStore,
    topicQueueItemStore
  });

  console.log('Publishing topicUpdatedEvent for topic with id', topic.id);
  topicUpdatedPublisher.publish({
    topic: EventTopics.TopicUpdated,
    message: {
      value: topic.id
    }
  });

  return {
    id: topicId,
    name
  };
}
