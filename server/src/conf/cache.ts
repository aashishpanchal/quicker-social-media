import conf from '@/conf';
import logger from '@/logger';
import {Redis} from 'ioredis';

/** Cache redis */
export class Cache {
  readonly _redis: Redis;

  constructor() {
    this._redis = this.setup();
  }

  private setup = () => {
    // Create redis instance
    const redis = new Redis(conf.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
    });
    // Event listeners
    redis.on('error', err => logger.error('redis Error:', err));
    return redis;
  };

  /** Serialize the given value for storage in Cache. */
  private serialize = (value: any) =>
    value instanceof Buffer ? value : JSON.stringify(value);

  /** Deserialize the retrieved value from Cache. */
  private deserialize = <T>(value: string | null) => {
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  };

  /** Set a value with optional TTL. */
  set = async <T>(key: string, value: T, ttl?: number) => {
    const data = this.serialize(value);
    const result = ttl
      ? await this._redis.setex(key, ttl, data)
      : await this._redis.set(key, data);
    return result === 'OK';
  };

  /** Get a value by key. retrieved value or null */
  get = async <T>(key: string) => {
    const data = await this._redis.get(key);
    return this.deserialize<T>(data);
  };

  /** Delete one or more keys. */
  del = async (...keys: string[]) => (await this._redis.del(...keys)) > 0;

  /** Check if a key exists. */
  has = async (key: string) => (await this._redis.exists(key)) > 0;

  /**
   * Get the TTL of a key.
   * @param {string} key - Redis key
   * @returns {Promise<number>} TTL in seconds, or -1 if no TTL is set
   */
  ttl = async (key: string): Promise<number> => await this._redis.ttl(key);

  /** Clear the entire cache. */
  clear = async () => !!(await this._redis.flushdb());
}

// Get Cache instance from tsyringe container
export default new Cache();
