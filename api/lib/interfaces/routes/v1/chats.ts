import express, { Request, Response, NextFunction } from 'express';

import chatsController from '../../controllers/chats';
import { authorizer } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/chat',
  authorizer(),
  async (req: Request, res: Response, next: NextFunction) => {
    const reqWithAuth = req as any;

    try {
      const response = await chatsController.getUserChats(reqWithAuth);
      res.json(response);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.put(
  '/chat/:chatId',
  authorizer(),
  async (req: Request, res: Response, next: NextFunction) => {
    const reqWithAuth = req as any;

    try {
      const response = await chatsController.updateChat(reqWithAuth);
      res.json(response);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
