import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';
import { swaggerConfig } from './common/swagger/swager.service';
import { Keys } from './common/enums/keys.enum';
import * as moment from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const appEnv = config.get(Keys.APP);
  const PORT = appEnv.port;
  const limit = appEnv.limit;
  const env = appEnv.env;

  swaggerConfig(app, env);

  app.enableCors();
  app.use(json({ limit }));

  await app.listen(PORT);

  Logger.log({
    message: `Server ᕕ(ಠ‿ಠ)ᕗ on environment: ${env} and port: ${PORT}, time: ${moment(
      new Date(),
    ).hour()}`,
  });
}

bootstrap();
