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
  applyDecorators,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Messages } from './../../../common/enums/message.enum';

//service
import { InvoiceService } from '../services/invoice.service';
import { ApiInfo } from './../../../common/decorators/api-info.decorator';
import { HttpErrorException } from './../../../common/exceptions/http.exceptions';
import { InvoiceCreateDto, InvoiceFilters } from '../dtos/invoice-input.dto';
import { DocControllers } from './../../../common/swagger/constants/invoice.constant';
import { JwtGuard } from 'common/auth/strategies/auth-jwt.guard';

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

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('/')
  @applyDecorators(
    ApiQuery({ name: 'userId', example: '1', required: true }),
    ApiQuery({ name: 'vendoId', example: '1', required: false }),
    ApiQuery({ name: 'invoiceDate', example: '18-MAY-14', required: false }),
  )
  @UseFilters(HttpErrorException)
  async find(@Query() query: InvoiceFilters, @Res() res: Response) {
    this.logger.log(Messages.queryBegin);

    const result = await this.service.findAll(query);

    this.logger.log(Messages.queryEnding);

    res.status(HttpStatus.CREATED).json(result);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
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
