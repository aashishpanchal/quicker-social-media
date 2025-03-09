import 'reflect-metadata';
import conf from '@/conf';
import logger from '@/logger';
import {createApp} from '@/app';
import {cyanBright} from 'ansis';

const main = async () => {
  // Create api server
  const app = await createApp();
  // HOST or PORT from config
  const {PORT, HOST} = conf;
  // Server start
  app.listen(PORT, HOST, () => {
    logger.info(cyanBright(`http://${HOST}:${PORT}`));
    logger.info(`Press CTRL + C to exit.`);
  });
};

void main();
