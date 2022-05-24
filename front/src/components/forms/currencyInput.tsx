import React, { useState } from 'react';
import { formatFiatAmount } from '../../services/formatFiatAmount';

type CurrencyInputProps = {
  target: string;
  amount: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  currencyCode?: string;
};

export const CurrencyAmount: React.FC<CurrencyInputProps> = ({
  amount,
  target,
  setValue,
  currencyCode,
}) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentInput, setCurrentInput] = useState(amount);

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (!currencyCode) {
      e.preventDefault();
      if (timer) clearTimeout(timer);
      setCurrentInput(e.target.value);
      const newTimer = setTimeout(() => {
        if (amount !== e.target.value) setValue(Number(e.target.value));
      }, 500);
      setTimer(newTimer);
    }
  };

  const prettyNumber = !currencyCode
    ? currentInput.toString()
    : formatFiatAmount(amount, currencyCode);

  const disabled = !!currencyCode;

  return (
    <div className="form-part amount-input">
      <label htmlFor={target}>Amount </label>
      <input
        value={prettyNumber}
        id={target}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
