import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

const bootstrap = async (): Promise<void> => {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    logger.log('DEV MODE - Accepting requests from everywhere :D');
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`PROD MODE - Accepting requests from origin ${serverConfig.origin}`);
  }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port: ${port}`);
};
void bootstrap();
