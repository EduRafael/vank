import { Keys } from '../common/enums/keys.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'tls';

export const dbProviders = [
  TypeOrmModule.forRootAsync({
    name: Keys.Postgres,
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        //ssl: true,
        type: config.get(Keys.TYPE),
        host: config.get(Keys.HOST),
        port: config.get(Keys.PORT),
        username: config.get(Keys.USERNAME),
        password: config.get(Keys.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts, .js}'],
        migrations: [__dirname + '/migrations/*{.ts, .js}'],
      } as ConnectionOptions;
    },
  }),
];
