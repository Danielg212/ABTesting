import { ILogObj, Logger } from 'tslog';
import app from './app';

const logger: Logger<ILogObj> = new Logger();

function start() {
  const PORT = 8080;
  app.listen(PORT, () => {
    logger.info(`✅ Server is listening on: http://localhost:${PORT}`);
  });
}
start();
