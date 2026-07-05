import express from 'express';
import { requestLogger } from './middleware/logger.middleware.js';
import { rateLimit } from './middleware/rateLimiter.middleware.js';
import authRouter from './routes/auth.router.js';
import logger from './config/logger.js';

logger.info("authRouter loaded");

const app = express();
app.use(express.json());

app.use(requestLogger);
logger.info("requestLogger");

app.use('/api/v1', rateLimit);
logger.info("rateLimit");

app.use('/api/v1/auth', authRouter);

export default app;