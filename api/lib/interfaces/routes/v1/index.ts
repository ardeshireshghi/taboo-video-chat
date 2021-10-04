import express from 'express';

import usersRouter from './users';
import loginRouter from './login';
import topicRouter from './topics';
import chatRouter from './chats';

const router = express.Router();

router.use('/', usersRouter);
router.use('/', loginRouter);
router.use('/', topicRouter);
router.use('/', chatRouter);

export default router;
