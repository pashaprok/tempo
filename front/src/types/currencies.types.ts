export type CurrencyType = 'crypto' | 'fiat';

export type CurrencyI = {
  name: string;
  code: string;
  type: CurrencyType;
};
