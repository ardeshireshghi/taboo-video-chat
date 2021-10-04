import express, { Request, Response, NextFunction } from 'express';

import chatsController from '../../controllers/chats';

const router = express.Router();

router.get(
  '/chat/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await chatsController.getUserChats(req);
      res.json(response);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
