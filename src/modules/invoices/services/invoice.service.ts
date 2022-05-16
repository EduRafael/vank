import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/enums/message.enum';
import AlreadyExistsError from 'src/common/errors/order-already-exists.error';
import { Connection, Repository } from 'typeorm';
import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import { InvoiceEntity } from '../entities/invoices.entity';
import { mapperCreate } from '../mappers/invoice-input.mapper';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
    private readonly connection: Connection,
  ) {}

  async getInvoices() {
    Logger.log('Invoices to Users');
    return 'Invoices to Users';
  }

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

  private async validateInvoice(params): Promise<boolean> {
    const invoice = await this.repository.findOne(params);

    return (invoice && true) || false;
  }
}
