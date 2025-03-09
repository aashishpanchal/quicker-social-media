import conf from '@/conf';
import jwt from 'jsonwebtoken';
import {uuid} from '@/lib/utils';
import {singleton} from 'tsyringe';
import {UnAuthorizedError} from 'exutile';

export interface JwtPayload extends jwt.JwtPayload {
  type?: string;
}

/** Jwt common class */
@singleton()
export class JwtToken {
  private _issuer = conf.NAME;
  private _secret = conf.SECRET;

  /**
   * create jwt payload
   */
  payload(sub: string, extra?: Record<string, any>): JwtPayload {
    return {
      sub,
      jti: uuid(),
      iss: this._issuer,
      ...extra,
    };
  }

  /**
   * create jwt token
   */
  create(payload: JwtPayload, options?: jwt.SignOptions) {
    // create jwt token
    return jwt.sign(payload, this._secret, options);
  }

  /**
   * verify jwt token
   */
  verify<T = JwtPayload>(token: string, options?: jwt.VerifyOptions): T {
    try {
      return jwt.verify(token, this._secret, options) as T;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError)
        throw new UnAuthorizedError('Jwt token is expired');
      if (error instanceof jwt.JsonWebTokenError)
        throw new UnAuthorizedError(error.message);
      throw error;
    }
  }
}
