import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './../../../common/enums/message.enum';
import AlreadyExistsError from './../../../common/errors/already-exists.error';
import { Connection, Repository } from 'typeorm';
import { InvoiceCreateDto, InvoiceFilters } from '../dtos/invoice-input.dto';
import { InvoiceEntity } from '../entities/invoices.entity';
import { mapperCreate } from '../mappers/invoice-input.mapper';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
    private readonly connection: Connection,
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

  async findAll(params: InvoiceFilters) {
    Logger.log('Invoices to Users');

    return 'Invoices to Users';
  }

  private async validateInvoice(params): Promise<boolean> {
    const invoice = await this.repository.findOne(params);

    return (invoice && true) || false;
  }
}
