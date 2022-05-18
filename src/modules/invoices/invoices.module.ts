import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'common/auth/auth.module';

import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceEntity } from './entities/invoices.entity';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceService } from './services/invoice.service';
import { RemoteInvoice } from './services/remote-invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity]),
    ConfigModule,
    AuthModule,
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, RemoteInvoice],
})
export class InvoicesModule {}
