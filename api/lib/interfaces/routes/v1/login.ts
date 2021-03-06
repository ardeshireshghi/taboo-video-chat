import express, { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../../domain/errors/ApiError';

import { default as loginController } from '../../controllers/login';

const router = express.Router();

router.post(
  '/magic-login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginController.sendLoginLink(req);
      res.json({ success: true });
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loginController.loginWithToken(req);
      if (user) {
        res.json(user);
      } else {
        next(new ApiError('login token is invalid/expired or not found', 422));
      }

      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
