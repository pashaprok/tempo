import { CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '../enums/currencies.enums';
import { ExchangeTypes } from '../types/exchangeTypes.types';

export type CurrencyExchangeI = {
  fromCurrency: CRYPTO_CURRENCIES;
  fromAmount: number;
  toCurrency: FIAT_CURRENCIES;
  toAmount: number;
  type: ExchangeTypes;
  time: Date;
};
