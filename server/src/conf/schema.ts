import * as z from 'zod';

// Env validate zod-schema
const schema = {
  PORT: z.coerce.number().default(3000),
  NAME: z.string(),
  HOST: z.string(),
  SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('prod'),
  CLIENT_URL: z.string().url(),
  // databases
  REDIS_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  // jwt
  JWT_ACCESS_EXP: z.string().default('30m'),
  JWT_REFRESH_EXP: z.string().default('30d'),
  // smtp
  SMTP_PORT: z.coerce.number(),
  SMTP_HOST: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  // s3 bucket
  S3_REGION: z.string(),
  S3_BUCKET: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
};

export default schema;
