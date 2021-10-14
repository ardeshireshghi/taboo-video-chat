import { Request } from 'express';
import { getUserChats as getUserChatsUseCase } from '../../application/chat/useCases/getChatsForUser';

import { ApiError } from '../../domain/errors/ApiError';
import services from '../../infrastructure/service-locator';

const controller = {
  async getUserChats(req: Request) {
    const reqWithAuth = req as any;
    const userId = reqWithAuth.auth.context.user.id;

    if (!userId) {
      const err = new ApiError('`userId` is not defined on auth token', 422);
      throw err;
    }

    const result = await getUserChatsUseCase(userId, services);

    return result;
  }
};

export default controller;
