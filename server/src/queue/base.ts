import os from 'os';
import ansis from 'ansis';
import logger from '@/logger';
import cache from '@/conf/cache';
import {Queue, Worker} from 'bullmq';

/** base-queue class */
export abstract class BaseQueue {
  readonly _queue: Queue;
  readonly _worker: Worker;

  constructor(name: string) {
    this._queue = this.queue(name);
    this._worker = this.worker(name);
  }

  /** Setup queue */
  private queue = (name: string) => {
    // Create new queue
    const queue = new Queue(name, {
      connection: cache._redis,
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: {
          count: 1000, // keep up to 1000 jobs
          age: 24 * 3600, // keep up to 24 hours
        },
        removeOnFail: {
          age: 24 * 3600, // keep up to 24 hours
        },
      },
    });

    // Close queue after stop server
    process.on('SIGTERM', () => {
      try {
        queue.close();
      } catch (error: any) {
        logger.error(`Error closing queue: ${error.message}`);
      } finally {
        process.exit(0);
      }
    });

    return queue;
  };

  /** Setup worker */
  private worker = (name: string) => {
    const worker = new Worker(
      name,
      async job => this.process(job.name, job.data),
      {
        connection: cache._redis,
        concurrency: os.cpus().length,
        useWorkerThreads: true,
      },
    );

    // Close worker after stop server
    process.on('SIGTERM', () => {
      try {
        worker.close();
      } catch (error: any) {
        logger.error(`Error closing worker: ${error.message}`);
      } finally {
        process.exit(0);
      }
    });

    // Event listeners
    worker.on('active', job =>
      logger.info(
        `Job ${ansis.red(job.id)} started, task name: ${ansis.red(job.name)}`,
      ),
    );

    worker.on('completed', job =>
      logger.info(
        `Job ${ansis.red(job.id)} completed, task name: ${ansis.red(job.name)}`,
      ),
    );

    worker.on('failed', (job, error) => {
      if (job)
        logger.error(
          `Job ${ansis.red(job.id)} failed, task name: ${ansis.red(job.name)}, error: ${error.message}`,
        );
      else logger.error(`Job failed, error: ${error.message}`);
    });

    worker.on('error', err => logger.error(err));

    return worker;
  };

  protected process = async (task: string, data: any): Promise<void> => {
    throw new Error('Method not implemented.');
  };
}
