import { Request } from 'express';
import { registerUser as register } from '../../application/useCases/registerUser';
import { ApiError } from '../../domain/errors/ApiError';
import { default as services } from '../../infrastructure/service-locator';

const controller = {
  async registerUser(req: Request) {
    if (!req.body.email || !req.body.name) {
      const err = new ApiError('email or name fields not set', 422);
      throw err;
    }

    const user = await register(
      { email: req.body.email, name: req.body.name },
      services
    );

    if (!user) {
      throw new ApiError('user already exists', 409);
    }

    return user;
  }
};

export default controller;
