import express, { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';
import getConfig from '../../../infrastructure/config';

import topicController from '../../controllers/topics';
import { authorizer } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/topic',
  authorizer(),
  async (req: Request, res: Response, next: NextFunction) => {
    const reqWithAuth = req as any;
    try {
      const response = await topicController.createOrUpdateTopic(reqWithAuth);
      res.json(response);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
