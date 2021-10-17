import { Request } from 'express';
import { getUserChats as getUserChatsUseCase } from '../../application/chat/useCases/getChatsForUser';
import { updateChat as updateUserChatUseCase } from '../../application/chat/useCases/updateUserChat';

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
  },

  async updateChat(req: Request) {
    const reqWithAuth = req as any;
    const userId = reqWithAuth.auth.context.user.id;
    const chatId = req.params.chatId;

    if (!userId) {
      const err = new ApiError('`userId` is not defined on auth token', 422);
      throw err;
    }

    if (!chatId) {
      const err = new ApiError('`chatId` is not valid', 422);
      throw err;
    }

    const result = await updateUserChatUseCase(userId, chatId, services);

    return result;
  }
};

export default controller;
