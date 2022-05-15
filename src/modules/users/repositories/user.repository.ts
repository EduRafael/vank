import { UserEntity } from '../entities/user.entity';

import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
