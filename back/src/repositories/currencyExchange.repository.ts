import { FindOptionsOrderValue } from 'typeorm/find-options/FindOptionsOrder';
import { MoreThan } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { CurrencyExchangeI } from '../interfaces/exchange.interface';
import { CurrencyExchangeEntity } from '../entities/CurrencyExchange.entity';

export class CurrencyExchangeRepository {
  readonly repository = AppDataSource.getRepository(CurrencyExchangeEntity);

  async postCurrencyExchange(currencyExchange: CurrencyExchangeI) {
    const whereParams = {
      fromAmount: currencyExchange.fromAmount,
      fromCurrency: currencyExchange.fromCurrency,
      toCurrency: currencyExchange.toCurrency,
      toAmount: currencyExchange.toAmount,
      type: currencyExchange.type,
      time: MoreThan<Date>(
        new Date(Date.parse(currencyExchange.time.toString()) - 1000),
      ),
    };

    const checkExist = await this.repository.find({ where: whereParams });

    if (!checkExist[0]) {
      return await this.repository.save(currencyExchange);
    }
    return checkExist[0];
  }

  async getAllCurrencyExchanges(order: string) {
    const orderBy: FindOptionsOrderValue = order === 'older' ? 'ASC' : 'DESC';
    return await this.repository.find({ order: { time: orderBy } });
  }

  async deleteSpecificCurrencyExchange(id: number) {
    return await this.repository.delete(id);
  }
}
