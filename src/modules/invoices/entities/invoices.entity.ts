import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { Expose } from 'class-transformer';
import { SupportedCurrencies } from './../../../common/enums/currencies.enum';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'invoice_id', type: 'int', default: 0 })
  invoiceId: number;

  @Index()
  @Column({ name: 'vendor_id', type: 'int' })
  vendorId: number;

  @Column({ name: 'invoice_number', type: 'varchar', length: 255 })
  invoiceNumber: string;

  @Index()
  @Column({ name: 'invoice_date', type: 'date', nullable: true })
  invoiceDate: string;

  @Column({ name: 'invoice_total', type: 'decimal' })
  invoiceTotal: number;

  @Column({ name: 'payment_total', type: 'decimal' })
  paymentTotal: number;

  @Column({ name: 'credit_total', type: 'decimal' })
  creditTotal: number;

  @Column({ name: 'bank_id', type: 'int' })
  bankId: number;

  @Expose()
  get invoiceTotalProcesed(): number {
    return this.invoiceTotal * 100;
  }

  @Column({ name: 'invoice_due_date', type: 'date', nullable: true })
  invoiceDueDate: string;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate: string;

  @Column({
    type: 'enum',
    enum: SupportedCurrencies,
    default: SupportedCurrencies.usd,
  })
  currency: SupportedCurrencies;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
