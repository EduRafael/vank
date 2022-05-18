import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { SupportedCurrencies } from './../../../common/enums/currencies.enum';

export class InvoiceCreateDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  invoiceId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  vendorId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  invoiceDate: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  invoiceTotal: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  paymentTotal: number;

  @IsNumber()
  @ApiProperty()
  creditTotal: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  bankId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  invoiceDueDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  paymentDate: string;

  @IsEnum(SupportedCurrencies)
  @ApiProperty({
    example: 'USD/EUR/CLP',
    enum: SupportedCurrencies,
  })
  currency: string;
}
