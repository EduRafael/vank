import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserEntity } from './entities/user.entity';
import { Keys } from 'src/common/enums/keys.enum';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UsersModule {}
