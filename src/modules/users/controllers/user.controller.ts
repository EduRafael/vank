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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

//service
import { UserService } from '../services/user.service';
import { HttpErrorException } from './../../../common/exceptions/http.exceptions';

import { Messages } from './../../../common/enums/message.enum';
import { ApiInfo } from './../../../common/decorators/api-info.decorator';
import { DocControllers } from './../../../common/swagger/constants/user.constant';
import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { JwtGuard } from 'common/auth/strategies/auth-jwt.guard';

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

  @UseGuards(JwtGuard)
  @Patch('/:userId')
  @ApiInfo(DocControllers.updated)
  @ApiBearerAuth()
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
