import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'invalid access token' });
    return;
  }

  res.status(err.code || 500);
  res.json({ error: err.message });
};
