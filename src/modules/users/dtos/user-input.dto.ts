import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

import { SupportedCurrencies } from './../../../common/enums/currencies.enum';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  internalCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  taxId: string;

  @IsEnum(SupportedCurrencies)
  @IsNotEmpty()
  @ApiProperty({
    example: 'USD/EUR/CLP',
    enum: SupportedCurrencies,
  })
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 100,
  })
  monthlyRequestFee: number;

  //TODO: El tipo Array no lo está tomando, lo dejo como string para la prueba
  @IsString()
  @ApiProperty({
    example: '[1,2]',
  })
  bankAccess: string;
}

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  taxId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'USD/EUR/CLP',
    enum: SupportedCurrencies,
  })
  currency?: string;
}
