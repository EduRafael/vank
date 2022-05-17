import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Keys } from './../../../common/enums/keys.enum';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../entities/invoices.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { remoteMapper } from '../mappers/invoice-remote.mapper';
import { InvoiceService } from './invoice.service';
import { InvoiceCreateDto } from '../dtos/invoice-input.dto';

@Injectable()
export class RemoteInvoice {
  private readonly logger = new Logger(RemoteInvoice.name);
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly invoiceService: InvoiceService,
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  @Cron('0 0 12 * * *')
  async orchestrator() {
    await this.getRemoteInvoices().subscribe(async (res) => {
      if (!res || !res.data) {
        return;
      }

      const data = res.data.split(/\n/);
      data.shift();
      for await (const row of data) {
        const invoiceRow = row.split(',');

        if (!invoiceRow) continue;

        const invoice = remoteMapper(invoiceRow);
        await this.registerInvoice(invoice);
      }
    });
  }

  private getRemoteInvoices(): Observable<AxiosResponse<string>> {
    const url = this.config.get(Keys.REMOTE_CSV);
    const result = this.httpService.get(url);
    return result;
  }

  private async registerInvoice(invoices: InvoiceCreateDto): Promise<string> {
    const exist = await this.invoiceRepository.findOne({
      where: { invoiceId: invoices.invoiceId },
    });

    if (exist) {
      this.logger.log('Registro Existente');
      return;
    }

    await this.invoiceService.create(invoices);

    return 'Success';
  }
}
