import { Request } from 'express';
import { getUserChats as getUserChatsUseCase } from '../../application/chat/useCases/getChatsForUser';

import { ApiError } from '../../domain/errors/ApiError';
import services from '../../infrastructure/service-locator';

const controller = {
  async getUserChats(req: Request) {
    if (!req.params.userId) {
      const err = new ApiError(' `userId` for chat is not set', 422);
      throw err;
    }

    const result = await getUserChatsUseCase(req.params.userId, services);

    return result;
  }
};

export default controller;
