import {
  text,
  uuid,
  varchar,
  boolean,
  pgTable,
  timestamp,
} from 'drizzle-orm/pg-core';
import {authEnum, ganderEnum, timestamps} from '../helper';

// schema
export const userTable = pgTable('users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  username: varchar('username', {length: 255}).notNull().unique(),
  email: varchar('email', {length: 255}), // email if of user
  password: text('password'),
  socialId: text('social_id'),
  authType: authEnum('auth_type'), // authentication type, oauth, local
  isBlock: boolean('is_block').notNull().default(false),
  isEmailVerify: boolean('is_email_verify').notNull().default(false),
  dob: timestamp('dob'), // date of birth
  fullname: varchar('fullname', {length: 255}),
  gander: ganderEnum('gander'),
  avatarUrl: text('avatar_url'),
  ...timestamps,
});

// types
export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;
