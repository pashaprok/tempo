import React from 'react';
import {
  datetimeClass,
  exchangeTypeClass,
  fromAmountClass,
  fromCurrencyClass,
  headingClass,
  toAmountClass,
  toCurrencyClass,
} from '../../constants/exchangesTableClassnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type ExchangesTableHeaderProps = {
  handleOrder: any;
  orderIcon: IconDefinition;
};

export const ExchangesTableHeader: React.FC<ExchangesTableHeaderProps> = ({
  handleOrder,
  orderIcon,
}) => {
  return (
    <tr>
      <th className={`${headingClass} ${datetimeClass}`} onClick={handleOrder}>
        <FontAwesomeIcon icon={orderIcon} />
        &nbsp; Date & Time
      </th>
      <th className={`${headingClass} ${fromCurrencyClass}`}>Currency from</th>
      <th className={`${headingClass} ${fromAmountClass}`}>Amount 1</th>
      <th className={`${headingClass} ${toCurrencyClass}`}>Currency to</th>
      <th className={`${headingClass} ${toAmountClass}`}>Amount 2</th>
      <th className={`${headingClass} ${exchangeTypeClass}`}>Type</th>
    </tr>
  );
};
