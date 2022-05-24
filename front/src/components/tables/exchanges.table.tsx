import React, { useEffect, useState } from 'react';
import '../../styles/exchanges-table.css';
import {
  faArrowUpShortWide,
  IconDefinition,
  faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getExchanges } from '../../redux/slices/getExchangesSlice';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { OrderType } from '../../types/order.types';
import { setOrderStateFunction } from '../../types/main.types';
import { ExchangeRowTable } from './exchangeRow.table';
import { ExchangesTableHeader } from './exchangesTableHeader.table';

type ExchangesTablePropsI = {
  order: OrderType;
  setOrder: setOrderStateFunction;
};

export const ExchangesTable: React.FC<ExchangesTablePropsI> = ({
  order,
  setOrder,
}) => {
  const [orderIcon, setOrderIcon] =
    useState<IconDefinition>(faArrowDownShortWide);

  const exchangesState = useAppSelector((state) => state.exchanges);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExchanges(order));
  }, [dispatch, order]);

  useEffect(() => {
    if (order === 'recent') setOrderIcon(faArrowDownShortWide);
    if (order === 'older') setOrderIcon(faArrowUpShortWide);
  }, [order]);

  const handleOrder = async () => {
    if (order === 'recent') setOrder('older');
    if (order === 'older') setOrder('recent');
  };

  const { isLoading, errorMessage, exchanges } = exchangesState;

  if (isLoading) return <LoadingSpinner />;

  if (errorMessage) return <div className="error-msg">{errorMessage}</div>;

  return (
    <>
      <table className="exchanges-table">
        <thead className="header">
          <ExchangesTableHeader
            handleOrder={handleOrder}
            orderIcon={orderIcon}
          />
        </thead>
        <tbody>
          {exchanges.map((exchange) => (
            <ExchangeRowTable exchange={exchange} key={exchange.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};
