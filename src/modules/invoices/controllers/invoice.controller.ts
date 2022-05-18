import {
  Res,
  HttpStatus,
  Controller,
  Body,
  UseFilters,
  Get,
  Logger,
  Query,
  Post,
  applyDecorators,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

//service
import { InvoiceService } from '../services/invoice.service';
import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import { InvoiceFilters } from '../models/invoices.model';

//common
import { Messages } from './../../../common/enums/message.enum';
import { ApiInfo } from './../../../common/decorators/api-info.decorator';
import { JwtGuard } from './../../../common/auth/strategies/auth-jwt.guard';
import { SupportedCurrencies } from './../../../common/enums/currencies.enum';
import { HttpErrorException } from './../../../common/exceptions/http.exceptions';
import { DocControllers } from './../../../common/swagger/constants/invoice.constant';

@Controller('invoices')
@ApiTags('Invoices')
export class InvoiceController {
  private readonly logger = new Logger(InvoiceController.name);

  constructor(private service: InvoiceService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('/')
  @applyDecorators(
    ApiQuery({ name: 'vendorId', example: '1', required: false }),
    ApiQuery({ name: 'invoiceDate', example: '18-MAY-14', required: false }),
    ApiQuery({
      name: 'currency',
      required: false,
      enum: SupportedCurrencies,
    }),
  )
  @ApiInfo(DocControllers.find)
  @UseFilters(HttpErrorException)
  async find(
    @Req() req: Request,
    @Query() query: InvoiceFilters,
    @Res() res: Response,
  ) {
    this.logger.log(Messages.queryBegin);

    const result = await this.service.findAll(query, req.headers);

    this.logger.log(Messages.queryEnding);

    res.status(HttpStatus.OK).json(result);
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

  @Get('/health')
  async health(@Res() res: Response) {
    Logger.debug(Messages.health);
    res.status(HttpStatus.OK).json({ message: Messages.health });
  }
}
