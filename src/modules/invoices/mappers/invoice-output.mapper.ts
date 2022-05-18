import { Logger } from '@nestjs/common';
import { SupportedCurrencies } from './../../../common/enums/currencies.enum';
import { InvoiceEntity } from '../entities/invoices.entity';
import { Coins } from '../models/invoices.model';

export class InvoiceOutput {
  private readonly logger = new Logger(InvoiceOutput.name);

  private readonly usd: number;
  private clp: number;
  private eur: number;

  constructor(private invoices: InvoiceEntity[], coins: Coins) {
    this.clp = coins.clp;
    this.usd = coins.usd;
    this.eur = coins.eur;
  }

  //TODO: Esta funcionalidad debería ser mejorada. (Dejo pendiente hasta tener mas tiempo)
  mapper(converter) {
    const result = this.invoices.map((invoice) => {
      const {
        id,
        currency,
        createdAt,
        updatedAt,
        creditTotal,
        paymentTotal,
        invoiceTotal,
        ...rest
      } = invoice;

      if (invoice.currency === converter) {
        return {
          ...rest,
          paymentTotal: Number(paymentTotal),
          invoiceTotal: Number(invoiceTotal),
          creditTotal: Number(creditTotal),
        };
      }

      const coinToConvert = this.coinConvert(converter);

      const method = this.transform[`${currency}-${converter}`]();

      const creditTransform = method(
        Number(creditTotal),
        Number(coinToConvert),
      );
      const paymentTransform = method(
        Number(paymentTotal),
        Number(coinToConvert),
      );
      const invoiceTransform = method(
        Number(invoiceTotal),
        Number(coinToConvert),
      );

      return {
        ...rest,
        creditTotal: creditTransform,
        paymentTotal: paymentTransform,
        invoiceTotal: invoiceTransform,
      };
    });

    return result;
  }

  private coinConvert(coin) {
    return {
      [SupportedCurrencies.eur]: this.eur,
      [SupportedCurrencies.usd]: this.usd,
      [SupportedCurrencies.clp]: this.clp,
    }[coin];
  }

  transform = {
    [`${SupportedCurrencies.clp}-${SupportedCurrencies.eur}`]: () =>
      this.convertCoinToCurrency,
    [`${SupportedCurrencies.clp}-${SupportedCurrencies.usd}`]: () =>
      this.convertCoinToCurrency,
    [`${SupportedCurrencies.eur}-${SupportedCurrencies.clp}`]: () =>
      this.convertCoinToCurrency,
    [`${SupportedCurrencies.usd}-${SupportedCurrencies.clp}`]: () =>
      this.convertCoinToCurrency,
    [`${SupportedCurrencies.usd}-${SupportedCurrencies.eur}`]: () =>
      this.convertUsdToEur,
    [`${SupportedCurrencies.eur}-${SupportedCurrencies.usd}`]: () =>
      this.convertEurToUsd,
  };

  private convertUsdToEur(coin, eur) {
    try {
      return (coin * eur) / this.usd;
    } catch (error) {
      return coin;
    }
  }

  private convertEurToUsd(coin, usd) {
    try {
      return (coin * usd) / this.eur;
    } catch (error) {
      return coin;
    }
  }

  private convertCoinToCurrency(coin, currency) {
    try {
      return coin / currency;
    } catch (error) {
      return coin;
    }
  }
}
