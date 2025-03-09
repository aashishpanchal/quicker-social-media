import cors from 'cors';
import conf from './conf';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import apiRoutes from './apis/routes';
import cookieParser from 'cookie-parser';
import {terminalLog} from './middleware/terminal-log';
import {rateLimiter} from './middleware/rate-limiter';
import {healthCheck} from './middleware/health-check';
import {errorHandler, notFoundError} from './middleware/errors-handler';

/** Create express app */
export const createApp = async () => {
  const app = express();

  // Middleware config
  app.use(helmet()); // Secure headers
  app.use(rateLimiter()); // Rate limiting
  app.use(terminalLog()); // Request logging
  app.use(express.json({limit: '30mb', inflate: true})); // Parse JSON requests
  app.use(express.urlencoded({extended: true, limit: '30mb'}));
  app.use(cors({origin: conf.CORS_ORIGIN, credentials: true})); // Cross Origin Resource Sharing (CORS)
  app.use(cookieParser()); // Access cookies
  app.use(passport.initialize()); // Passport config

  // Routes
  app.use('/api/v1', apiRoutes());
  app.all('/health', healthCheck);

  // Error handler
  app.use(notFoundError);
  app.use(errorHandler);

  return app;
};
