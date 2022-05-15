import { UserCreateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';
import { SupportedCurrencies } from 'src/common/enums/currencies.enum';

export const mapper = (
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

  if (!Object.keys(SupportedCurrencies).includes(currency)) {
    throw new Error(
      `La moneda ['${userDto.currency}'] no corresponde a las soportadas`,
    );
  }

  user.currency = SupportedCurrencies[currency];

  return user;
};
