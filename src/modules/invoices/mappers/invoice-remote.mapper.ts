import { InvoiceCreateDto } from '../dtos/invoice-input.dto';
import * as moment from 'moment-timezone';
import { SupportedCurrencies } from './../../../common/enums/currencies.enum';

export const remoteMapper = (fields): InvoiceCreateDto => {
  const invoices = new InvoiceCreateDto();
  const today = moment().format('DD-MMM-YY');

  invoices.invoiceId = fields[0] || 0;
  invoices.vendorId = fields[1] || 180522;
  invoices.invoiceNumber = fields[2] || 1000;
  invoices.invoiceDate = fields[3] || today;
  invoices.invoiceTotal = fields[4] || 0;
  invoices.paymentTotal = fields[5] || 0;
  invoices.creditTotal = fields[6] || 0;
  invoices.bankId = fields[7] || 0;
  invoices.invoiceDueDate =
    fields[8] || moment(today).year(2023).format('DD-MMM-YY');
  invoices.paymentDate = fields[9] || today;
  invoices.currency = fields[10] || SupportedCurrencies.clp;

  return invoices;
};
