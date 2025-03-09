import * as tables from './tables';
import {relations} from 'drizzle-orm/relations';

// user relationship's
export const userRelations = relations(tables.userTable, ({many}) => ({}));

// jwt-token relationship's
export const jwtTokenRelations = relations(tables.jwtTokenTable, ({one}) => ({
  user: one(tables.userTable, {
    fields: [tables.jwtTokenTable.userId],
    references: [tables.userTable.id],
  }), // many-to-one
}));
