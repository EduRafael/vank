import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';
import { SupportedCurrencies } from 'src/common/enums/currencies.enum';

export const mapperCreate = (
  userDto: UserCreateDto,
  password: string,
): UserEntity => {
  const user = new UserEntity();
  user.companyName = userDto.companyName;
  user.email = userDto.email;
  user.internalCode = userDto.internalCode;
  user.taxId = userDto.taxId;
  user.monthlyRequestFee = userDto.monthlyRequestFee;
  user.password = password;

  const currency = userDto.currency.toLocaleLowerCase().trim();
  validateCurrency(currency);

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
    validateCurrency(auxCurrency);

    user.currency = SupportedCurrencies[auxCurrency];
  }

  return user;
};

const validateCurrency = (currency): void => {
  if (!Object.keys(SupportedCurrencies).includes(currency)) {
    throw new Error(
      `La moneda ['${currency}'] no corresponde a las soportadas`,
    );
  }
};
