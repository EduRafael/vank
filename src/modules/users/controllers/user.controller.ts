import {
  Controller,
  Res,
  HttpStatus,
  Body,
  Param,
  Patch,
  UseFilters,
  Get,
  Post,
  Logger,
  applyDecorators,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

//service
import { UserService } from '../services/user.service';
import { HttpErrorException } from './../../../common/exceptions/http.exceptions';

import { Messages } from './../../../common/enums/message.enum';
import { ApiInfo } from './../../../common/decorators/api-info.decorator';
import { DocControllers } from './../../../common/swagger/constants/user.constant';
import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private service: UserService) {}

  @Post('/new')
  @ApiInfo(DocControllers.created)
  @UseFilters(HttpErrorException)
  async create(@Body() body: UserCreateDto, @Res() res: Response) {
    this.logger.log(Messages.creationBegin);
    const result = await this.service.create(body);

    this.logger.log(Messages.creationEnding);
    res.status(HttpStatus.CREATED).json(result);
  }

  @Patch('/:userId')
  @ApiInfo(DocControllers.updated)
  @UseFilters(HttpErrorException)
  async update(
    @Param('userId') userId,
    @Body() body: UserUpdateDto,
    @Res() res: Response,
  ) {
    this.logger.log(Messages.updateBegin);
    const result = await this.service.update(userId, body);

    this.logger.log(Messages.UpdateEnding);
    res.status(HttpStatus.CREATED).json(result);
  }

  @Get('/health')
  @ApiInfo(DocControllers.health)
  async health(@Res() res: Response) {
    this.logger.log(Messages.health);
    res.status(HttpStatus.OK).json({ message: Messages.health });
  }
}
