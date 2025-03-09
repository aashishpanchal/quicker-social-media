import conf from '@/conf';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

/** hash data */
export const hash = async (password: string): Promise<string> =>
  bcryptjs.hash(password, await bcryptjs.genSalt(10));

/** hash compare */
export const compare = (password: string, hash: string): Promise<boolean> =>
  bcryptjs.compare(password, hash);

/** Generate random unique uuid */
export const uuid = () => crypto.randomUUID();

/** Hmac-Hash data with salt */
export const hmac = (data: string) =>
  crypto.createHmac('sha256', conf.SECRET).update(data).digest('base64url');

/** Raw string to encode and decode base64 */
export const base64 = {
  encode: (data: string) => Buffer.from(data).toString('base64url'),
  decode: (data: string) => Buffer.from(data, 'base64url').toString(),
};

/** Enum to array with type */
export const enumToArr = <T extends object>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] => Object.values(myEnum) as any;
