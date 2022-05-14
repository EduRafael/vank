import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InvoicesModule } from './modules/invoices/invoices.module';

@Module({
  imports: [UsersModule, InvoicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
