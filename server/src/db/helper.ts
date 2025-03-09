import {enumToArr} from '@/lib/utils';
import {pgEnum, timestamp} from 'drizzle-orm/pg-core';
import {AUTH, DEVICE, GANDER, ACTIVITY} from '@/constants/enums';

// Table Enum
export const authEnum = pgEnum('auth_enum', enumToArr(AUTH));
export const deviceEnum = pgEnum('device_enum', enumToArr(DEVICE));
export const ganderEnum = pgEnum('gander_enum', enumToArr(GANDER));
export const activityEnum = pgEnum('activity_enum', enumToArr(ACTIVITY));

// Timestamps columns
export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};
