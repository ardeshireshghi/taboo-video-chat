import { Request } from 'express';
import {
  sendLoginLink as sendLink,
  UserNotFoundError
} from '../../application/useCases/sendLoginLink';
import { verifyLoginToken } from '../../application/useCases/verifyLoginToken';
import { ApiError } from '../../domain/errors/ApiError';
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
  },
  async loginWithToken(req: Request) {
    if (!req.body.email) {
      throw new ApiError('email param is missing', 422);
    }

    if (!req.body.loginToken) {
      const err = new ApiError('invalid or no loginToken', 422);
      throw err;
    }

    const maybeUser = await verifyLoginToken(
      {
        email: req.body.email as string,
        token: req.body.loginToken as string
      },
      services
    );

    return maybeUser;
  }
};

export default controller;
