import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('health')
export class HealthCheckController {
  @Get()
  @ApiExcludeEndpoint()
  async helthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'Im still alive ᕕ(ಠ‿ಠ)ᕗ' });
  }
}
