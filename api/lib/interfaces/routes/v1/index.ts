import express from 'express';

import { default as usersRouter } from './users';
import { default as loginRouter } from './login';

const router = express.Router();

router.use('/', usersRouter);
router.use('/', loginRouter);

export default router;
