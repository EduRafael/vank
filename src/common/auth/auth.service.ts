import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthError from 'common/errors/auth.error';
import { compare } from 'common/utils/ncrypt.utils';
import { UserService } from 'modules/users/services/user.service';
import { AuthDto, AuthType } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: AuthDto): Promise<{}> {
    try {
      const { email, password } = body;

      const user = await this.userService.find({ email });

      const allow = await compare(password, user.password);

      if (!allow) throw Error();

      const payload: AuthType = {
        userId: user.id,
        bank: user.bankAccess,
        email,
        currency: user.currency,
      };

      const token = this.generateJwtToken(payload);

      return {
        userId: user.id,
        bank: JSON.parse(user.bankAccess),
        token,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new AuthError('Email o contraseña invalidos');
    }
  }

  private generateJwtToken(params) {
    return this.jwtService.sign(params);
  }
}
