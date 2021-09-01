import express, { Request, Response, NextFunction } from 'express';

import { default as usersController } from '../../controllers/users';

const router = express.Router();

router.post(
  '/user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersController.registerUser(req);
      res.json(user);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
