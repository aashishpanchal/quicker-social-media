import conf from '@/conf';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  out: conf.MIGRATE_PATH,
  schema: ['./src/db/tables/*', './src/db/helper.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    ssl: false,
    url: conf.DATABASE_URL!,
  },
  verbose: true,
  breakpoints: true,
});
