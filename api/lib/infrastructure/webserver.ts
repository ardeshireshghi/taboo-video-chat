import getConfig from './config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from '../interfaces/api/v1';
import { errorHandler } from '../interfaces/middlewares/error';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use('/', router);
app.use(errorHandler);

export { app };
export const port = getConfig().serverPort;
