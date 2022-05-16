import { SupportedCurrencies } from './../../../common/enums/currencies.enum';
import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import { InvoiceEntity } from '../entities/invoices.entity';

export const mapperCreate = (invoiceDto: InvoiceCreateDto): InvoiceEntity => {
  const invoice = new InvoiceEntity();

  invoice.invoiceId = invoiceDto.invoiceId;
  invoice.vendorId = invoiceDto.vendorId;
  invoice.invoiceNumber = invoiceDto.invoiceNumber;
  invoice.invoiceDate = invoiceDto.invoiceDate;
  invoice.invoiceTotal = invoiceDto.invoiceTotal;
  invoice.paymentTotal = invoiceDto.paymentTotal;
  invoice.creditTotal = invoiceDto.creditTotal;
  invoice.bankId = invoiceDto.bankId;
  invoice.invoiceDueDate = invoiceDto.invoiceDueDate;
  invoice.paymentDate = invoiceDto.paymentDate;

  const currency = invoiceDto.currency.toLocaleLowerCase().trim();
  invoice.currency = SupportedCurrencies[currency];

  return invoice;
};
