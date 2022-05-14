import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InvoicesModule } from './modules/invoices/invoices.module';

//config
import { ConfigModule } from '@nestjs/config';
import config from './config/index.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    UsersModule,
    InvoicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
