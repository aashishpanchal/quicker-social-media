import {User as UserType} from '@/db/tables';

declare global {
  // override express types
  namespace Express {
    // if, you use passport.js, you can use this
    interface User extends UserType {}
    // Override request interface
    interface Request {
      user?: User;
    }
  }
}
