import conf from '@/conf';
import rateLimit, {type RateLimitRequestHandler} from 'express-rate-limit';

/**
 * Generates a rate limiter middleware function.
 *
 * @return {RateLimitRequestHandler} A rate limiter middleware function that limits each IP to 300 requests per minute and returns a 'Too many requests' message when the limit is exceeded.
 */
const rateLimiter = (): RateLimitRequestHandler => {
  return rateLimit({
    max: conf.RAT_LIMIT, // limit each IP to 300 requests per windowMs
    windowMs: 60 * 1000, // 1 minutes
    message: 'Too many requests',
  });
};

export {rateLimiter};
