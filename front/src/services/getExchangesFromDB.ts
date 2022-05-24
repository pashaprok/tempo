import Axios from 'axios';
import { OrderType } from '../types/order.types';

export async function getExchangesFromDB(order: OrderType) {
  const response = await Axios({
    url: 'http://localhost:3033/exchange',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      order,
    },
  });

  if (response.data) return response.data;
  return null;
}
