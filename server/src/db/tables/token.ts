import {userTable} from './users';
import {timestamps} from '../helper';
import {text, uuid, boolean, pgTable, timestamp} from 'drizzle-orm/pg-core';

// schema
export const jwtTokenTable = pgTable('jwt_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => userTable.id, {
    onDelete: 'cascade',
  }), // which user jwt-token
  jit: text('jit').unique().notNull(), // jwt-identifier
  isBlacklist: boolean('is_blacklist').default(false),
  blacklistAt: timestamp('blacklist_at'), // when blacklisted jwt token
  expiredAt: timestamp('expired_at').notNull(), // when expire of jwt
  ...timestamps,
});

// types
export type JwtToken = typeof jwtTokenTable.$inferSelect;
export type NewJwtToken = typeof jwtTokenTable.$inferInsert;
