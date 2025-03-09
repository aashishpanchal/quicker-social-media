import fs from 'fs';
import * as z from 'zod';
import dotenv from 'dotenv';

type ReturnObject<T extends z.ZodRawShape> = z.infer<z.ZodObject<T>>;

/**
 * Loads, validates, and merges environment variables from .env files.
 */
export default function config<
  T extends z.ZodRawShape,
  E extends object,
>(options: {
  obj: T;
  path?: string | string[];
  extra?: (env: ReturnObject<T>) => E;
}): ReturnObject<T> & E {
  const {path = '.env', obj, extra} = options;
  const pathArray = Array.isArray(path) ? path : [path];
  // Load environment variables from specified files
  const configs = pathArray
    .filter(fs.existsSync)
    .map(envFilePath => dotenv.parse(fs.readFileSync(envFilePath)));
  // Merge all loaded configurations
  const env = configs.reduce((acc, curr) => ({...acc, ...curr}), {});
  // Validate environment variables using Zod
  const result = z.object(obj).safeParse(env);
  if (!result.success) {
    console.error(
      'Environment variable validation failed:',
      result.error.errors,
    );
    process.exit(1);
  }
  // Return frozen object with validated variables and extra properties
  return Object.freeze({...result.data, ...extra?.(result.data)}) as any;
}
