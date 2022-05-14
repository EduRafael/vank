import {
  Res,
  HttpStatus,
  Controller,
  Body,
  Param,
  Patch,
  UseFilters,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

//service
import { InvoiceService } from '../services/invoice.service';

@Controller('invoices')
@ApiTags('Invoices')
export class InvoiceController {
  constructor(private service: InvoiceService) {}

  @Get('/new')
  async getNews(@Param('orderId') orderId, @Res() res: Response) {
    const result = await this.service.getInvoices();
    res.status(HttpStatus.CREATED).json({ result });
  }
}
