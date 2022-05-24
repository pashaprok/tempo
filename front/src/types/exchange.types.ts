export type ExchangeI = {
  id: number;
  fromCurrency: string;
  fromAmount: number;
  toCurrency: string;
  toAmount: number;
  time: Date;
  type: 'Live Price' | 'Exchanged';
};
