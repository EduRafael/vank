import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';

import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { Keys } from './../../../common/enums/keys.enum';
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
  ) {}

  @Cron('0 0 17 * * *')
  async orchestrator() {
    await this.getRemoteInvoices().subscribe(async (res) => {
      if (!res || !res.data) {
        return;
      }
      this.logger.log('Collecting information from the remote file');

      const data = res.data.split(/\n/);
      data.shift();
      for await (const row of data) {
        const invoiceRow = row.split(',');

        if (!invoiceRow) continue;

        const invoice = remoteMapper(invoiceRow);
        await this.registerRemoteInvoice(invoice);
      }
    });
  }

  private getRemoteInvoices(): Observable<AxiosResponse<string>> {
    try {
      const url = this.config.get(Keys.REMOTE_CSV);
      const result = this.httpService.get(url);
      return result;
    } catch (error) {
      this.logger.error(`An ocurred error, detail: ${error.message}`);
      return null;
    }
  }

  private async registerRemoteInvoice(
    invoices: InvoiceCreateDto,
  ): Promise<void> {
    const exist = await this.invoiceService.findByParams({
      invoiceId: invoices.invoiceId,
    });

    if (exist) return;

    await this.invoiceService.create(invoices);
  }
}
