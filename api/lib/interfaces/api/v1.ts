import express from 'express';

import { default as v1Router } from '../routes/v1';

const router = express.Router();

router.use('/api/v1', v1Router);

export default router;
