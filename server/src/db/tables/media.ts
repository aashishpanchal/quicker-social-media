import {userTable} from './users';
import {timestamps} from '../helper';
import {text, uuid, bigint, pgTable, varchar} from 'drizzle-orm/pg-core';

// schema
export const mediaTable = pgTable('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => userTable.id, {
    onDelete: 'cascade',
  }), // which user jwt-token
  url: text('url').notNull(), // file uri/url
  name: text('name').notNull(), // name of file
  size: bigint('size', {mode: 'number'}).notNull(),
  mimetype: varchar('mimetype').notNull(), // file type, image/jpg,png,...etc
  ...timestamps,
});

// types
export type Media = typeof mediaTable.$inferSelect;
export type NewMedia = typeof mediaTable.$inferInsert;
