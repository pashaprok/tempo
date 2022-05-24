import React, { useState } from 'react';
import '../styles/main.page.css';
import { HeadingOne } from '../components/layout/titles';
import { CurrencyExchangeForm } from '../components/forms/currencyExchange';
import { ExchangesTable } from '../components/tables/exchanges.table';
import { OrderType } from '../types/order.types';

export const MainPage = () => {
  const [exchangesOrder, setExchangesOrder] = useState<OrderType>('recent');
  return (
    <div className="container">
      <div className="main-page-content">
        <HeadingOne cls="page-title" text="Exchange" />
        <CurrencyExchangeForm exchangesOrder={exchangesOrder} />
        <ExchangesTable order={exchangesOrder} setOrder={setExchangesOrder} />
      </div>
    </div>
  );
};
