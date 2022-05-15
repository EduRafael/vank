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
import { HttpErrorException } from 'src/common/exceptions/http.exceptions';

import { Messages } from 'src/common/enums/message.enum';
import { ApiInfo } from 'src/common/decorators/api-info.decorator';
import { DocControllers } from 'src/common/swagger/constants/user.constant';
import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private service: UserService) {}

  @Post('/new')
  @ApiInfo(DocControllers.created)
  @UseFilters(HttpErrorException)
  async create(@Body() body: UserCreateDto, @Res() res: Response) {
    Logger.debug(Messages.creationBegin);
    const result = await this.service.create(body);

    Logger.debug(Messages.creationEnding);
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
    Logger.debug(Messages.updateBegin);
    const result = await this.service.update(userId, body);

    Logger.debug(Messages.UpdateEnding);
    res.status(HttpStatus.CREATED).json(result);
  }

  @Get('/health')
  @ApiInfo(DocControllers.health)
  async health(@Res() res: Response) {
    Logger.debug(Messages.health);
    res.status(HttpStatus.OK).json({ message: Messages.health });
  }
}
