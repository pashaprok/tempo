import React, { useEffect, useState } from 'react';
import { CurrencyDropdown } from './currencyDropdown';
import { CurrencyAmount } from './currencyInput';
import '../../styles/currency-exchange-form.css';
import {
  FIAT_CURRENCIES,
  CRYPTO_CURRENCIES,
} from '../../services/availableCurrencies';
import { BTC, USD } from '../../constants/currencies';
import { getCurrentExchangeFromAPI } from '../../services/getCurrentExchange';
import { postExchangeToDB } from '../../services/postExchangeToDB';
import { ExchangeI } from '../../types/exchange.types';
import { getExchanges } from '../../redux/slices/getExchangesSlice';
import { OrderType } from '../../types/order.types';
import { useAppDispatch } from '../../hooks/redux';

type ExchangesFormPropsI = {
  exchangesOrder: OrderType;
};

export const CurrencyExchangeForm: React.FC<ExchangesFormPropsI> = ({
  exchangesOrder,
}) => {
  const [currentExchangeState, setCurrentExchangeState] =
    useState<ExchangeI | null>(null);
  const [cryptoCurrency, setCryptoCurrency] = useState(BTC.code);
  const [fiatCurrency, setFiatCurrency] = useState(USD.code);
  const [cryptoAmount, setCryptoAmount] = useState<number>(1);
  const [fiatAmount, setFiatAmount] = useState<number>(1);
  const changeDeps = [cryptoAmount, cryptoCurrency, fiatCurrency];
  const [exchangeToSave, setExchangeToSave] = useState<ExchangeI | null>(null);
  const dispatch = useAppDispatch();

  const saveLiveExchange = (exchange: ExchangeI) => {
    postExchangeToDB(exchange).then(() => {
      dispatch(getExchanges(exchangesOrder));
    });
  };

  const getCurrentExchange = async () => {
    try {
      if (cryptoAmount > 0) {
        const currentExchange = await getCurrentExchangeFromAPI(
          cryptoCurrency,
          fiatCurrency,
          cryptoAmount,
        );

        if (currentExchange && currentExchange.data) {
          const exchange = currentExchange.data;
          setCurrentExchangeState(exchange);
          setFiatAmount(exchange.toAmount);
          setCryptoAmount(exchange.fromAmount);
          setCryptoCurrency(exchange.fromCurrency);
          setFiatCurrency(exchange.toCurrency);
        }

        return currentExchange;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    getCurrentExchange().then((r) => r);
  }, changeDeps);

  useEffect(() => {
    if (currentExchangeState !== exchangeToSave)
      setExchangeToSave(currentExchangeState);
  }, [currentExchangeState]);

  useEffect(() => {
    if (exchangeToSave && currentExchangeState === exchangeToSave) {
      saveLiveExchange(exchangeToSave);
    }
  }, [currentExchangeState, exchangeToSave]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (exchangeToSave && currentExchangeState === exchangeToSave) {
        getCurrentExchange().then((r) => r);
        saveLiveExchange(exchangeToSave);
      }
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, [saveLiveExchange]);

  const handleSave = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (currentExchangeState) {
      currentExchangeState.type = 'Exchanged';
      await postExchangeToDB(currentExchangeState);
      dispatch(getExchanges(exchangesOrder));
    }
  };

  return (
    <>
      <form className="currency-exchange-form">
        <CurrencyDropdown
          cls="dropdown"
          currencies={CRYPTO_CURRENCIES}
          label="Currency from: "
          type="crypto"
          value={cryptoCurrency}
          setValue={setCryptoCurrency}
        />
        <CurrencyAmount
          target="crypto-amount"
          amount={cryptoAmount}
          setValue={setCryptoAmount}
        />
        <div className="form-part down">
          <div className="equals">=</div>
        </div>
        <CurrencyDropdown
          cls="dropdown"
          currencies={FIAT_CURRENCIES}
          label="Currency to: "
          type="fiat"
          value={fiatCurrency}
          setValue={setFiatCurrency}
        />
        <CurrencyAmount
          target="fiat-amount"
          amount={fiatAmount}
          setValue={setFiatAmount}
          currencyCode={fiatCurrency}
        />
        <div className="form-part down">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      </form>
    </>
  );
};
