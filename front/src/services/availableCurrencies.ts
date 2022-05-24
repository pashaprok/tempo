import { CurrencyType } from '../types/currencies.types';
import * as CURRENCIES from '../constants/currencies';

export function availableCurrencies(type: CurrencyType) {
  const allCurrencies = Object.values(CURRENCIES);
  return allCurrencies.filter((currency) => currency.type === type);
}

export const FIAT_CURRENCIES = availableCurrencies('fiat');
export const CRYPTO_CURRENCIES = availableCurrencies('crypto');
