import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Keys } from 'src/common/enums/keys.enum';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../entities/invoices.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RemoteInvoice {
  private readonly logger = new Logger(RemoteInvoice.name);
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
  ) {}

  private getRemoteInvoices(): Observable<AxiosResponse<string>> {
    const url = this.config.get(Keys.REMOTE_CSV);
    const result = this.httpService.get(url);
    return result;
  }

  private async registerInvoice(invoices): Promise<string> {
    return '';
  }
}
