import { CurrencyExchange } from '../services/currencyExchange.service';
import { CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '../enums/currencies.enums';

export function checkCorrectCurrencies(from: string, to: string) {
  const checkFrom = CurrencyExchange.checkCorrectCurrency(
    from,
    CRYPTO_CURRENCIES,
  );
  const checkTo = CurrencyExchange.checkCorrectCurrency(to, FIAT_CURRENCIES);

  return !(!checkFrom || !checkTo);
}
