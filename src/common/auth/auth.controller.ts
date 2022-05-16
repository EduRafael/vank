import { Body, Controller, Post, Res, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpErrorException } from '../exceptions/http.exceptions';

@Controller('auth')
@ApiTags('Auth')
export class AuhtController {
  constructor() {}

  @Post('/login')
  @UseFilters(HttpErrorException)
  async login(@Body() Body, @Res() res: Response) {}
}
