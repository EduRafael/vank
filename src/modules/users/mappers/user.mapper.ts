import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';
import { SupportedCurrencies } from 'src/common/enums/currencies.enum';

export const mapperCreate = (userDto: UserCreateDto): UserEntity => {
  const user = new UserEntity();
  user.companyName = userDto.companyName;
  user.internalCode = userDto.internalCode;
  user.taxId = userDto.taxId;
  user.monthlyRequestFee = userDto.monthlyRequestFee;
  user.bankAccess = userDto.bankAccess;

  const currency = userDto.currency.toLocaleLowerCase().trim();
  user.currency = SupportedCurrencies[currency];

  return user;
};

export const mapperUpdate = (
  user: UserEntity,
  body: UserUpdateDto,
): UserEntity => {
  const { taxId, currency } = body;

  if (taxId) {
    user.taxId = taxId;
  }

  if (currency) {
    const auxCurrency = currency.toLocaleLowerCase().trim();
    user.currency = SupportedCurrencies[auxCurrency];
  }

  return user;
};
