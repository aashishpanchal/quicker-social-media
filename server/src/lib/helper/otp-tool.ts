import conf from '@/conf';
import crypto from 'crypto';
import {singleton} from 'tsyringe';
import {base64, hmac} from '@/lib/utils';

@singleton()
export class OtpTool {
  readonly _chars = '0123456789';

  /** Generate random characters. */
  private generate = (length: number) =>
    Array.from(
      {length},
      () => this._chars[crypto.randomInt(0, this._chars.length)],
    ).join('');

  /** Generate a hashed otp based on the email and expiry. */
  public makeOtp = (email: string, digits: number = 6) => {
    const exp = Date.now() + conf.OTP_EXPIRY;
    const otp = this.generate(digits);
    const hash = hmac(`${email}.${otp}.${exp}`);
    // encode the hash and expiry in base64url format
    const hash64 = base64.encode(`${hash}.${exp}`);
    return {exp: conf.OTP_LENGTH, otp, hash64}; // Return expiry in seconds
  };

  /** Validate the provided otp with the email */
  public verifyOtp = (email: string, otp: string, encodedHash: string) => {
    const decodedHash = base64.decode(encodedHash);
    // Ensure the decoded hash has a valid format
    if (!decodedHash || !decodedHash.includes('.')) return false;
    const [hash, exp] = decodedHash.split('.');
    // Check if the code has expired
    if (!exp || Date.now() > Number(exp)) return false;
    // Validate the code by comparing hashes
    return hmac(`${email}.${otp}.${exp}`) === hash;
  };
}
