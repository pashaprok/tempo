import React from 'react';
import { ExchangeI } from '../../types/exchange.types';
import {
  bodyClass,
  datetimeClass,
  exchangeTypeClass,
  fromAmountClass,
  fromCurrencyClass,
  toAmountClass,
  toCurrencyClass,
} from '../../constants/exchangesTableClassnames';
import { formatDateTime } from '../../services/formatDateTime';
import { formatFiatAmount } from '../../services/formatFiatAmount';

type ExchangeRowTableProps = {
  exchange: ExchangeI;
};

export const ExchangeRowTable: React.FC<ExchangeRowTableProps> = ({
  exchange,
}) => {
  const clsTypeExchange =
    exchange.type === 'Live Price' ? 'live-price' : 'exchanged';
  return (
    <tr key={exchange.id}>
      <td className={`${bodyClass} ${datetimeClass}`}>
        {formatDateTime(exchange.time)}
      </td>
      <td className={`${bodyClass} ${fromCurrencyClass}`}>
        {exchange.fromCurrency}
      </td>
      <td className={`${bodyClass} ${fromAmountClass}`}>
        {exchange.fromAmount}
      </td>
      <td className={`${bodyClass} ${toCurrencyClass}`}>
        {exchange.toCurrency}
      </td>
      <td className={`${bodyClass} ${toAmountClass}`}>
        {formatFiatAmount(exchange.toAmount, exchange.toCurrency)}
      </td>
      <td className={`${bodyClass} ${exchangeTypeClass} ${clsTypeExchange}`}>
        {exchange.type}
      </td>
    </tr>
  );
};
