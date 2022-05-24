import React from 'react';
import { OrderType } from './order.types';

export type setOrderStateFunction = React.Dispatch<
  React.SetStateAction<OrderType>
>;
