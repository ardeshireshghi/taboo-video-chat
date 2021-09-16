import express, { Request, Response, NextFunction } from 'express';

import topicController from '../../controllers/topics';

const router = express.Router();

router.post(
  '/topic',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await topicController.createOrUpdateTopic(req);
      res.json(response);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
