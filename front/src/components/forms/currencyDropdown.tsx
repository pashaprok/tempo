import React from 'react';
import { CurrencyI, CurrencyType } from '../../types/currencies.types';

type CurrencyDropDownProps = {
  label: string;
  cls: string;
  type: CurrencyType;
  currencies: CurrencyI[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};

export const CurrencyDropdown: React.FC<CurrencyDropDownProps> = ({
  cls,
  label,
  type,
  currencies,
  value,
  setValue,
}) => {
  const handleSelect = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className={`form-part ${cls}`}>
      <label htmlFor={type}>{label}</label>
      <select name={type} id={type} onChange={handleSelect} value={value}>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};
