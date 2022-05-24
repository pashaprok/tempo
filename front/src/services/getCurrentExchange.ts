import Axios from 'axios';

export async function getCurrentExchangeFromAPI(
  cryptoCurrency: string,
  fiatCurrency: string,
  cryptoAmount: number,
) {
  const response = await Axios({
    data: {
      fromCurrency: cryptoCurrency,
      toCurrency: fiatCurrency,
      amountFrom: cryptoAmount,
    },
    url: 'http://localhost:3033/exchange/current',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.data) return response;
}
