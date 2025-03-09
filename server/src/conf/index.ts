import schema from './schema';
import config from '@/lib/config';

// Load env file
export default config({
  obj: schema,
  path: '.env',
  extra: env => ({
    IS_DEV: env.NODE_ENV == 'dev',
    RAT_LIMIT: 300, // limit each IP to 300 requests per windowMs
    CORS_ORIGIN: [env.CLIENT_URL],
    // drizzle-migrate path
    MIGRATE_PATH: 'drizzle',
    // OTP
    OTP_LENGTH: 6, // otp length
    OTP_EXPIRY: 1000 * 60 * 10, // 10 minutes
    // task queue
    QUEUE: 'task',
  }),
});
