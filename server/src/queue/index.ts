import conf from '@/conf';
import logger from '@/logger';
import {BaseQueue} from './base';
import {singleton} from 'tsyringe';
import {JobsOptions} from 'bullmq';

/** task-queue class */
@singleton()
export class TaskQueue extends BaseQueue {
  constructor() {
    super(conf.QUEUE);
  }

  /** Add email-task  in queue */
  sendEmail = (data: any, opts?: JobsOptions) =>
    this._queue.add('EMAIL', data, opts);

  /** Add push-notification task in queue */
  sendPush = (data: any, opts?: JobsOptions) =>
    this._queue.add('PUSH', data, opts);

  /** Process of queue */
  protected process = async (task: string, data: any): Promise<void> => {
    switch (task) {
      case 'EMAIL':
        throw new Error('Method not implemented.');
        break;
      case 'PUSH':
        throw new Error('Method not implemented.');
        break;
      default:
        logger.warn('Invalid task');
        break;
    }
  };
}
