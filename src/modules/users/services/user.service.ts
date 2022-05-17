import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';
import { mapperCreate, mapperUpdate } from '../mappers/user.mapper';

import { Messages } from './../../../common/enums/message.enum';
import AlreadyExistsError from './../../../common/errors/already-exists.error';
import ResourceNotFound from './../../../common/errors/resouce-not-found.error';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
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
      const user = await mapperCreate(body);

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
      const user = await this.find({ id });

      mapperUpdate(user, body);

      await this.repository.save(user);

      return { message: Messages.updatedSuccess };
    } catch (error) {
      throw error;
    }
  }

  async find(params) {
    try {
      const users = await this.repository.findOne({ where: params });

      if (!users) {
        this.logger.error(Messages.findNotFound + 'Users');
        throw new ResourceNotFound('Users');
      }

      this.logger.debug(Messages.findSuccess + ' Users');

      return users;
    } catch (error) {
      throw error;
    }
  }

  private async validateUser(params): Promise<boolean> {
    const user = await this.repository.findOne({ where: params });

    return (user && true) || false;
  }
}
