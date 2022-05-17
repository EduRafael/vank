import { Catch, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Keys } from 'common/enums/keys.enum';
import AuthError from 'common/errors/auth.error';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthType } from '../auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(Keys.SECRET_KEY),
    });
  }

  async validate(payload: AuthType) {
    return {
      userId: payload.userId,
      email: payload.email,
      banks: JSON.parse(payload.bank),
      currency: payload.currency,
    };
  }
}
