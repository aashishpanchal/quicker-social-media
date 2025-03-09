import format from './format';
import winston from 'winston';

const LEVEL = 'silly';
const LEVELS = winston.config.npm.levels;

/**
 * Logger class that wraps Winston logging functionalities.
 * Supports multiple log levels and formats.
 */
export class Logger {
  private _logger: winston.Logger;

  constructor() {
    // Create the logger instance that has to be exported
    this._logger = winston.createLogger({
      format,
      level: LEVEL,
      levels: LEVELS,
      transports: [
        // Allow the use the console to print the messages
        new winston.transports.Console(),
        new winston.transports.File({
          level: 'error',
          filename: 'logs/error.log',
          format: winston.format.uncolorize(),
        }),
      ],
    });
  }

  private log = (
    level: 'info' | 'debug' | 'warn' | 'error',
    message: any,
    args: any[],
  ): void => {
    this._logger.log(level, message, ...args);
  };

  public info = (message: unknown, ...args: any[]): void =>
    this.log('info', message, args);

  public warn = (message: unknown, ...args: any[]): void =>
    this.log('warn', message, args);

  public error = (message: unknown, ...args: any[]): void =>
    this.log('error', message, args);

  public debug = (message: unknown, ...args: any[]): void =>
    this.log('debug', message, args);
}

// We can use directly
export default new Logger();
