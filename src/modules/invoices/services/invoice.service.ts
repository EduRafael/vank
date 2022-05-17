import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './../../../common/enums/message.enum';
import AlreadyExistsError from './../../../common/errors/already-exists.error';
import { Connection, Repository } from 'typeorm';
import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import { InvoiceEntity } from '../entities/invoices.entity';
import { mapperCreate } from '../mappers/invoice-input.mapper';
import { AuthService } from 'common/auth/auth.service';
import { verify } from 'crypto';
import { Converter, InvoiceFilters } from '../models/invoices.model';
import { invoiceOutputMapper } from '../mappers/invoice-output.mapper';
import { ConfigService } from '@nestjs/config';
import { Keys } from 'common/enums/keys.enum';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
    private readonly connection: Connection,
    private readonly authService: AuthService,
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async create(body: InvoiceCreateDto) {
    const queryRunner = this.connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (await this.validateInvoice({ invoiceId: body.invoiceId })) {
      throw new AlreadyExistsError('InvoiceID', body.invoiceId);
    }

    try {
      const invoice = await mapperCreate(body);

      await manager.save(invoice);

      await queryRunner.commitTransaction();

      return { message: Messages.createdSuccess };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(params: InvoiceFilters, header: any) {
    try {
      const { vendorId, invoiceDate, currency } = params;
      const { authorization } = header;
      const user = this.authService.decodeToken(authorization);

      const search = {
        ...(vendorId ? { vendorId } : ''),
        ...(invoiceDate ? { invoiceDate } : ''),
      };

      const invoices: InvoiceEntity[] = await this.repository.find({
        where: search,
      });

      if (invoices.length < 1) {
        this.logger.log(
          'No se encontraron registros para con los filtros seleccionados',
        );
        return {
          message:
            'No se encontraron registros para con los filtros seleccionados',
        };
      }

      const converter = await this.checkRate(currency || user?.currency);

      return invoiceOutputMapper(invoices, converter);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  private async validateInvoice(params): Promise<boolean> {
    const invoice = await this.repository.findOne(params);

    return (invoice && true) || false;
  }

  private async checkRate(currency): Promise<Converter> {
    const coin = `${currency}_PHP`;
    const baseUrl = this.config.get(Keys.URL_CURR);
    const apiKey = this.config.get(Keys.API_KEY);

    let url = `${baseUrl}?q=${coin}&compact=ultra&apiKey=${apiKey}`;

    const result = await axios.get(url);

    return {
      currency,
      rate: result.data.coin,
    };
  }
}
