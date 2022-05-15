import { Injectable, Logger } from '@nestjs/common';
import { Messages } from 'src/common/enums/message.enum';
import AlreadyExistsError from 'src/common/errors/order-already-exists.error';
import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from '../mappers/user.mapper';
import { encrypt } from 'src/common/utils/crypto';
import ResourceNotFound from 'src/common/errors/resouce-not-found.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private readonly connection: Connection,
  ) {}

  async create(body: UserCreateDto): Promise<{ [key: string]: string }> {
    const queryRunner = this.connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (await this.validateUser({ email: body.email })) {
      throw new AlreadyExistsError('Email', body.email);
    }

    try {
      const hasPassword = await encrypt(body.password);

      const user = await mapper(body, hasPassword);

      await manager.save(user);

      await queryRunner.commitTransaction();

      return { message: Messages.createdSuccess };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: string,
    body: UserUpdateDto,
  ): Promise<{ [key: string]: string }> {
    try {
      if (!(await this.validateUser({ id }))) {
        throw new ResourceNotFound('Usuario');
      }

      Logger.debug({ id, body });
      return { message: Messages.updatedSuccess };
    } catch (error) {
      throw error;
    }
  }

  async find(params) {
    try {
      const users = await this.repository.findOne({ where: params });

      Logger.debug(Messages.createdSuccess + 'Users');
      return users;
    } catch (error) {
      Logger.error(Messages.findNotFound + 'Users');

      throw new ResourceNotFound('Usuario');
    }
  }

  private async validateUser(params): Promise<boolean> {
    const user = await this.repository.findOne({ where: params });

    return (user && true) || false;
  }
}
