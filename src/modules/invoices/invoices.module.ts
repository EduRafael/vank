import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceEntity } from './entities/invoices.entity';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceService } from './services/invoice.service';
import { RemoteInvoice } from './services/remote-invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity]),
    HttpModule,
    ConfigModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, RemoteInvoice],
})
export class InvoicesModule {}
