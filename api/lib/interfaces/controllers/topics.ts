import { Request } from 'express';
import { createTopicAndEnqueue } from '../../application/useCases/createTopicAndEnqueue';

import { ApiError } from '../../domain/errors/ApiError';
import services from '../../infrastructure/service-locator';

const controller = {
  async createOrUpdateTopic(req: Request) {
    const reqWithAuth = req as any;
    const userId = reqWithAuth.auth.context.user.id;
    if (!req.body.name || !userId) {
      const err = new ApiError(
        '`name` field or `userId` for topic is not set',
        422
      );
      throw err;
    }

    // TODO: Pass just the necessary services
    const result = await createTopicAndEnqueue(
      { name: req.body.name, userId: userId },
      services
    );

    return result;
  }
};

export default controller;
