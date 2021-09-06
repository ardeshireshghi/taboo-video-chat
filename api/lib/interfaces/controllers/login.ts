import { Request } from 'express';
import {
  sendLoginLink as sendLink,
  UserNotFoundError
} from '../../application/useCases/sendLoginLink';
import { ApiError } from '../../domain/Error';
import { default as services } from '../../infrastructure/service-locator';

const controller = {
  async sendLoginLink(req: Request) {
    if (!req.body.email) {
      const err = new ApiError('email field not set', 422);
      throw err;
    }

    try {
      await sendLink({ email: req.body.email }, services);
    } catch (err) {
      console.log(err.name, err instanceof UserNotFoundError);
      if (err instanceof UserNotFoundError) {
        console.log('Error sending magic link', err);
        return;
      } else {
        throw err;
      }
    }
  }
};

export default controller;
