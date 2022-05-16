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
  Query,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { Messages } from 'src/common/enums/message.enum';

//service
import { InvoiceService } from '../services/invoice.service';
import { ApiInfo } from 'src/common/decorators/api-info.decorator';
import { HttpErrorException } from 'src/common/exceptions/http.exceptions';
import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import { DocControllers } from 'src/common/swagger/constants/invoice.constant';

@Controller('invoices')
@ApiTags('Invoices')
export class InvoiceController {
  private readonly logger = new Logger(InvoiceController.name);

  constructor(private service: InvoiceService) {}

  @Get('/health')
  async health(@Res() res: Response) {
    Logger.debug(Messages.health);
    res.status(HttpStatus.OK).json({ message: Messages.health });
  }

  @Get('/')
  async find(@Query() query, @Res() res: Response) {}

  @Post('/new')
  @ApiInfo(DocControllers.created)
  @UseFilters(HttpErrorException)
  async create(@Body() body: InvoiceCreateDto, @Res() res: Response) {
    this.logger.log(Messages.creationBegin);
    const result = await this.service.create(body);

    this.logger.log(Messages.creationEnding);
    res.status(HttpStatus.CREATED).json(result);
  }
}
