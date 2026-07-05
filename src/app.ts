import express from 'express';
import { requestLogger } from './middleware/logger.middleware.js';
import { rateLimit } from './middleware/rateLimiter.middleware.js';

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use('/api/v1', rateLimit);

export default app;