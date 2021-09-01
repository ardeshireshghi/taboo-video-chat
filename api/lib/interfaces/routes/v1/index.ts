import express from 'express';

import { default as usersRouter } from './users';

const router = express.Router();

router.use('/', usersRouter);

export default router;
