import Axios from 'axios';
import { ExchangeI } from '../types/exchange.types';

export async function postExchangeToDB(exchange: ExchangeI) {
  const response = await Axios({
    url: 'http://localhost:3033/exchange',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: exchange,
  });

  if (response.data) return response.data;
  return null;
}
