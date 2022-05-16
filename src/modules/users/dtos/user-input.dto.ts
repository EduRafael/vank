import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

import { SupportedCurrencies } from 'src/common/enums/currencies.enum';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

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
  @ApiProperty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  monthlyRequestFee: number;

  //TODO: El tipo Array no lo está tomando, lo dejo como string para la prueba
  @IsString()
  @ApiProperty()
  bankAccess: string;
}

export class UserUpdateDto {
  @IsString()
  @ApiProperty()
  taxId?: string;

  @IsString()
  @ApiProperty()
  currency?: string;
}
