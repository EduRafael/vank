import {
  Controller,
  Res,
  HttpStatus,
  Body,
  Param,
  Patch,
  UseFilters,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

//service
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/')
  async getNews(@Param('orderId') orderId, @Res() res: Response) {
    const result = await this.service.get();
    res.status(HttpStatus.OK).json({ result });
  }
}
