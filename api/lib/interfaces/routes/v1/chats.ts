import express, { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';

import getConfig from '../../../infrastructure/config';
import chatsController from '../../controllers/chats';
import { authorizer } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/chat/:userId',
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

export default router;
