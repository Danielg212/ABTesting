import app from './app';
import { loadConfig } from './config/FileConfig';
import { ILogObj, Logger } from 'tslog';
const logger: Logger<ILogObj> = new Logger();

function start() {
  const PORT = 8080;
  app.listen(PORT, () => {
    logger.info(`✅ Server is listening on: http://localhost:${PORT}`);
  });
}

loadConfig().then(() => {
  logger.info('Config loaded');
  start();
});
