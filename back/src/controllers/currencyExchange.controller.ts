import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { CurrencyExchange } from '../services/currencyExchange.service';
import { checkCorrectCurrencies } from '../utils/checkCorrectCurrencies';
import { CurrencyExchangeRepository } from '../repositories/currencyExchange.repository';
import { ExchangeTypes } from '../types/exchangeTypes.types';

export function currentCurrencyExchange(req: Request, res: Response) {
  if (!checkCorrectCurrencies(req.body.fromCurrency, req.body.toCurrency)) {
    throw new createHttpError.BadRequest('Incorrect currency input!').message;
  }

  if (+req.body.fromAmount < 0) {
    throw new createHttpError.BadRequest('Incorrect amount input!').message;
  }

  const exchange = new CurrencyExchange(
    req.body.fromCurrency,
    req.body.toCurrency,
    req.body.amountFrom,
  );

  return exchange.getCurrencyExchange(res);
}

export async function postCurrencyExchange(req: Request, res: Response) {
  if (!checkCorrectCurrencies(req.body.fromCurrency, req.body.toCurrency)) {
    throw new createHttpError.BadRequest('Incorrect currency input!').message;
  }

  if (+req.body.fromAmount < 0 || +req.body.toAmount < 0) {
    throw new createHttpError.BadRequest('Incorrect amount input!').message;
  }

  let exchangeType: ExchangeTypes;
  if (req.body.type as ExchangeTypes) {
    exchangeType = String(req.body.type) as ExchangeTypes;
  } else {
    throw new createHttpError.BadRequest('Incorrect exchange type input!')
      .message;
  }
  const newCurrencyExchange =
    await new CurrencyExchangeRepository().postCurrencyExchange({
      fromCurrency: req.body.fromCurrency,
      fromAmount: +req.body.fromAmount,
      toCurrency: req.body.toCurrency,
      toAmount: +req.body.toAmount,
      type: exchangeType,
      time: req.body.time,
    });

  return res.status(201).json(newCurrencyExchange);
}

export async function getAllCurrencyExchanges(req: Request, res: Response) {
  const { order } = req.query;
  let orderParam = String(order);
  if (!(orderParam === 'recent' || orderParam === 'older') || !orderParam) {
    orderParam = 'recent';
  }

  const currencyExchanges =
    await new CurrencyExchangeRepository().getAllCurrencyExchanges(orderParam);

  return res.status(200).json(currencyExchanges);
}

export async function deleteCurrencyExchange(req: Request, res: Response) {
  const deleteExchange =
    await new CurrencyExchangeRepository().deleteSpecificCurrencyExchange(
      req.body.deleteId,
    );

  return res.status(200).json(deleteExchange);
}
