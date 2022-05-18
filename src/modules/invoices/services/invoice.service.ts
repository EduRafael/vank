import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import { InvoiceEntity } from '../entities/invoices.entity';
import { mapperCreate } from '../mappers/invoice-input.mapper';
import { InvoiceFilters } from '../models/invoices.model';
import { InvoiceOutput } from '../mappers/invoice-output.mapper';

//Commons
import { Messages } from './../../../common/enums/message.enum';
import AlreadyExistsError from './../../../common/errors/already-exists.error';
import { AuthService } from './../../../common/auth/auth.service';
import { checkRate } from './../../../common/utils/convert-currency.utils';
import { SupportedCurrencies } from './../../../common/enums/currencies.enum';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
    private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}

  async create(body: InvoiceCreateDto) {
    const queryRunner = this.connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const exist = await this.findByParams({ invoiceId: body.invoiceId });

    if (exist) {
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
        this.logger.log(Messages.filtersNotResult);
        return {
          message: Messages.filtersNotResult,
        };
      }

      const converter = currency || user?.currency;
      const clp = await checkRate(SupportedCurrencies.clp);
      const usd = await checkRate(SupportedCurrencies.usd);
      const eur = await checkRate(SupportedCurrencies.eur);

      console.log({ clp, usd, eur });

      const invoiceOutput = new InvoiceOutput(invoices, { clp, usd, eur });

      return invoiceOutput.mapper(converter);
    } catch (error) {
      this.logger.error(`An ocurred error, detail: ${error.message}`);
      throw error;
    }
  }

  async findByParams(params): Promise<InvoiceEntity> {
    const invoice = await this.repository.findOne(params);

    if (!invoice) {
      this.logger.log(Messages.findNotFound + 'Invoice');
      return null;
    }

    return invoice;
  }
}
