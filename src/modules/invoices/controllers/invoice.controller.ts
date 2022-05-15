import {
  Res,
  HttpStatus,
  Controller,
  Body,
  Param,
  Patch,
  UseFilters,
  Get,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { Messages } from 'src/common/enums/message.enum';

//service
import { InvoiceService } from '../services/invoice.service';

@Controller('invoices')
@ApiTags('Invoices')
export class InvoiceController {
  constructor(private service: InvoiceService) {}

  @Get('/health')
  async health(@Res() res: Response) {
    Logger.debug(Messages.health);
    res.status(HttpStatus.OK).json({ message: Messages.health });
  }
}
