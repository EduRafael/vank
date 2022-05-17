import { SupportedCurrencies } from 'common/enums/currencies.enum';
import { InvoiceEntity } from '../entities/invoices.entity';
import { Converter } from '../models/invoices.model';

export const invoiceOutputMapper = (
  invoices: InvoiceEntity[],
  converter: Converter,
) => {
  const result = invoices.map((invoice) => {
    // if (invoice.currency !== converter.currency) {
    //   return converterCurrency(converter, invoice);
    // }
    const { id, currency, createdAt, updatedAt, ...rest } = invoice;
    return rest;
  });
  return result;
};

const converterCurrency = (converter: Converter, invoice: InvoiceEntity) => {
  const { currency, invoiceTotal, paymentTotal, creditTotal } = invoice;

  if (
    converter.currency == SupportedCurrencies.clp &&
    currency == SupportedCurrencies.eur
  ) {
  }

  if (
    converter.currency == SupportedCurrencies.clp &&
    currency == SupportedCurrencies.usd
  ) {
  }

  if (
    converter.currency == SupportedCurrencies.usd &&
    currency == SupportedCurrencies.eur
  ) {
  }

  if (
    converter.currency == SupportedCurrencies.usd &&
    currency == SupportedCurrencies.clp
  ) {
  }

  if (
    converter.currency == SupportedCurrencies.eur &&
    currency == SupportedCurrencies.usd
  ) {
  }

  if (
    converter.currency == SupportedCurrencies.eur &&
    currency == SupportedCurrencies.clp
  ) {
  }
  return {};
};
