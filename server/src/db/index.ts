import conf from '@/conf';
import logger from '@/logger';
import postgres from 'postgres';
import * as tables from './tables';
import * as relation from './relation';
import {drizzle} from 'drizzle-orm/node-postgres';

// Create connection
export const client = postgres(conf.DATABASE_URL);

client.listen('connect', () => logger.info('Database connected'));
client.listen('error', error => logger.error(`Database error:\n${error}`));

// Graceful shutdown
const shutdown = async () => {
  logger.info('Closing database connection...');
  await client.end();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown); // Handle Ctrl+C

// Initialize the drizzle
export default drizzle(client, {schema: {...tables, ...relation}});
