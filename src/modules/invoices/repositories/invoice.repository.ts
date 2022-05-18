import { InvoiceEntity } from '../entities/invoices.entity';

import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(InvoiceEntity)
export class InvoiceRepository extends Repository<InvoiceEntity> {}
