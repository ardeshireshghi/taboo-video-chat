import { Chat } from '../../domain/Chat';
import { Topic } from '../../domain/Topic';
import { createHash } from '../../infrastructure/createHash';
import { Services } from '../../infrastructure/service-locator';

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

type TopicWithOptionalChat = Topic & { chat: Omit<Chat, 'id'> | undefined };

export async function createTopicAndEnqueue(
  data: {
    name: string;
    userId: string;
  },
  {
    topicStore,
    topicUsersStore,
    topicQueueStore,
    topicQueueItemStore
  }: Pick<
    Services,
    'topicStore' | 'topicUsersStore' | 'topicQueueStore' | 'topicQueueItemStore'
  >
): Promise<TopicWithOptionalChat> {
  const { userId, name } = data;
  const topicId = createHash(name);

  // Add the topic to topic store
  await topicStore.set(topicId, {
    id: topicId,
    name
  });

  // This is for now just for writing and keeping track of all the users for
  // a given topic
  await topicUsersStore.set?.(topicId, [userId]);

  // Check if someone else has already queued for the topic
  const lastQueuedItemIdForTopic = await topicQueueStore.getLastFromList?.(
    topicId
  );

  let chat;

  if (!lastQueuedItemIdForTopic) {
    const topic = {
      id: topicId,
      name
    };
    await enqueueTopic(topic, userId, {
      topicQueueStore,
      topicQueueItemStore
    });
  } else {
    // Get the queued item (it will be expired in 24 hours)
    const lastQueuedItem = await topicQueueItemStore.get(
      lastQueuedItemIdForTopic
    );

    // If there is another user queued since the this user is active we
    // don't need to enqueue this user and rather return `otherUserIdQueuedForTopic`
    // to client to redirect to the topic meeting page
    // This assumes that the other user is online
    // TODO: notify other user via email that they can join the meeting (for now log them in and join the chat page)
    if (lastQueuedItem.userId && lastQueuedItem.userId !== userId) {
      // TODO: this should at this point publish event topic.user_pairs.selected
      chat = {
        topic: {
          id: topicId,
          name
        },
        users: [userId, lastQueuedItem.userId]
      };
    } else {
      await enqueueTopic(
        {
          id: topicId,
          name
        },
        userId,
        {
          topicQueueStore,
          topicQueueItemStore
        }
      );
    }
  }

  return {
    id: topicId,
    name,
    chat
  };
}
