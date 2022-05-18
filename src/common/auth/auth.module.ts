import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Keys } from 'common/enums/keys.enum';
import { UsersModule } from 'modules/users/users.module';
import { AuhtController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/auth-jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Keys.SECRET_KEY),
          signOptions: {
            expiresIn: config.get(Keys.EXPIRED_TOKEN),
          },
        };
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuhtController],
  exports: [AuthService],
})
export class AuthModule {}
