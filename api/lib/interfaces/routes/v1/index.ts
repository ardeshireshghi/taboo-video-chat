import express from 'express';

import { default as usersRouter } from './users';
import { default as loginRouter } from './login';
import { default as topicRouter } from './topics';

const router = express.Router();

router.use('/', usersRouter);
router.use('/', loginRouter);
router.use('/', topicRouter);

export default router;
