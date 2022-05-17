import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { getConnectionOptions } from 'typeorm';

//config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config/index.config';
import { HealthCheckController } from './common/health/health-check.controller';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: ['dist/**/*.entity.js'],
          migrations: ['dist/migrations/**/*.js'],
        }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    AuthModule,
    UsersModule,
    InvoicesModule,
    DatabaseModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
