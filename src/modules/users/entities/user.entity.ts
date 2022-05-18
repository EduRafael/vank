import {
  Status,
  SupportedCurrencies,
} from './../../../common/enums/currencies.enum';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  //TODO: Lo agrego como entero, porque a nivel de prueba es mas fácil que usar un UUID
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'company_name', type: 'varchar', length: 80 })
  companyName: string;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 80 })
  password: string;

  @Column({ name: 'internal_code', type: 'varchar', length: 30 })
  internalCode: string;

  @Column({ name: 'tax_id', type: 'varchar', length: 30 })
  taxId: string;

  @Column({
    type: 'enum',
    enum: SupportedCurrencies,
    default: SupportedCurrencies.usd,
  })
  currency: SupportedCurrencies;

  @Column({ type: 'int', name: 'monthly_fee' })
  monthlyRequestFee: number;

  @Column({ type: 'enum', enum: Status, default: Status.active })
  status: Status;

  //TODO: No está aceptando usar array, envío como varchar para probar (Buscar una mejor forma si queda tiempo)
  @Column({ type: 'varchar', name: 'bank_access' })
  bankAccess: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
