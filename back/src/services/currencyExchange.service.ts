import { Response } from 'express';
import * as https from 'https';
import createHttpError from 'http-errors';
import { coinAPIConfig } from '../config/coinAPI';
import { coinAPIRequestsLogger } from '../utils/logger';
import { CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '../enums/currencies.enums';
import { CoinAPIResponse } from '../interfaces/coinAPI.interface';
import { CurrencyExchangeI } from '../interfaces/exchange.interface';

export class CurrencyExchange {
  readonly coinAPIKey: string = coinAPIConfig.apiKey;

  readonly coinAPIDomain: string = coinAPIConfig.domain;

  readonly fromCurrency: CRYPTO_CURRENCIES;

  readonly toCurrency: FIAT_CURRENCIES;

  readonly amountFrom: number;

  constructor(
    fromCurrency: CRYPTO_CURRENCIES,
    toCurrency: FIAT_CURRENCIES,
    fromAmount: number,
  ) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.amountFrom = fromAmount;
  }

  private generateExchangeOptions() {
    return {
      method: 'GET',
      hostname: this.coinAPIDomain,
      path: `/v1/exchangerate/${this.fromCurrency}/${this.toCurrency}`,
      headers: { 'X-CoinAPI-Key': this.coinAPIKey },
    };
  }

  static calculateExchangeResult(amount: number, rate: number) {
    return amount * rate;
  }

  static checkCorrectCurrency(checkFor: string, currenciesList: object) {
    return Object.values(currenciesList).includes(checkFor);
  }

  static async parseExchangesFromAPI(buffer: Buffer): Promise<CoinAPIResponse> {
    return await JSON.parse(String(buffer));
  }

  getCurrencyExchange(res: Response) {
    let buffer = Buffer.from('');
    let data;

    const request = https.request(
      this.generateExchangeOptions(),
      (response) => {
        response.on('data', (chunk) => {
          buffer += chunk;
        });

        response.on('end', async () => {
          data = await CurrencyExchange.parseExchangesFromAPI(buffer);
          const resultExchange: CurrencyExchangeI = {
            fromCurrency: data.asset_id_base || 'BTC',
            fromAmount: this.amountFrom,
            toCurrency: data.asset_id_quote || 'USD',
            toAmount:
              CurrencyExchange.calculateExchangeResult(
                this.amountFrom,
                data.rate,
              ) || 39000,
            time: data.time || new Date().toISOString(),
            type: 'Live Price',
          };

          coinAPIRequestsLogger.info(JSON.stringify(resultExchange));
          res.status(200).json(resultExchange);
        });
      },
    );

    request.on('error', (error) => {
      coinAPIRequestsLogger.error('Error: ', error);
      throw new createHttpError.NotFound(error.message).message;
    });

    request.end();

    // mock, because coinAPI has restricts to request count
    // const resultExchange: CurrencyExchangeI = {
    //   fromCurrency: this.fromCurrency,
    //   fromAmount: this.amountFrom,
    //   toCurrency: this.toCurrency,
    //   toAmount: 38155 * this.amountFrom,
    //   type: 'Live Price',
    //   time: new Date(),
    // };
    //
    // coinAPIRequestsLogger.info(JSON.stringify(resultExchange));
    // res.status(200).json(resultExchange);
  }
}
