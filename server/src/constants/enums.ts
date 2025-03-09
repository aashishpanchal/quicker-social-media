import type {ValueOf} from 'exutile';

/** User auth types */
export const AUTH = Object.freeze({
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
});

export type AUTH = ValueOf<typeof AUTH>;

/** User Gander types */
export const GANDER = Object.freeze({
  MALE: 'MALE',
  OTHER: 'OTHER',
  FEMALE: 'FEMALE',
});

export type GANDER = ValueOf<typeof GANDER>;

/** User Activity types */
export const ACTIVITY = Object.freeze({
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
});

export type ACTIVITY = ValueOf<typeof ACTIVITY>;

/** User Device types */
export const DEVICE = Object.freeze({
  WEB: 'WEB',
  IOS: 'IOS',
  ANDROID: 'ADMIN',
});

export type DEVICE = ValueOf<typeof DEVICE>;
