import { Request } from 'express';
import { createTopicAndEnqueue } from '../../application/useCases/createTopicAndEnqueue';
import { createChat } from '../../application/useCases/createChat';
import { ApiError } from '../../domain/errors/ApiError';
import { default as services } from '../../infrastructure/service-locator';

const controller = {
  async createOrUpdateTopic(req: Request) {
    if (!req.body.name || !req.body.userId) {
      const err = new ApiError(
        '`name` field or `userId` for topic is not set',
        422
      );
      throw err;
    }

    // TODO: Pass just the necessary services
    const result = await createTopicAndEnqueue(
      { name: req.body.name, userId: req.body.userId },
      services
    );

    // if the topic has found match and `chat` object is returned
    if (result.chat) {
      // TODO: Pass just the necessary services
      // TODO: Find a pub-sub way for this
      await createChat(result.chat, services);
      delete result.chat;
    }

    return result;
  }
};

export default controller;
