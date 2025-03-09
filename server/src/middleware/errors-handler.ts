import conf from '@/conf';
import logger from '@/logger';
import {ErrorRequestHandler, Router} from 'express';
import {globalErrorHandler, NotFoundError} from 'exutile';

// Error-Handler
export const errorHandler: ErrorRequestHandler = globalErrorHandler({
  isDev: conf.IS_DEV,
  write: logger.error,
});

// NotFound handler
export const notFoundError: Router = Router().all('*', (req, res) => {
  // Generate NotFound Error
  const err = new NotFoundError(`Cannot ${req.method} on ${req.originalUrl}`, {
    url: req.originalUrl,
    method: req.method,
  });
  // Send json format response
  res.status(err.status).json(err.toJson());
});
