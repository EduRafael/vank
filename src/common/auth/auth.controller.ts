import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpErrorException } from '../exceptions/http.exceptions';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuhtController {
  constructor(private service: AuthService) {}

  @Post('/login')
  @UseFilters(HttpErrorException)
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const result = await this.service.login(body);
    res.status(HttpStatus.OK).json(result);
  }
}
