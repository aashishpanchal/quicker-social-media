import logger from '@/logger';
import db, {client} from './index';
import {migrate} from 'drizzle-orm/postgres-js/migrator';

/** Database migration */
const migration = async () => {
  try {
    await migrate(db, {migrationsFolder: 'drizzle'});
    logger.info('Migration completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

void migration();
