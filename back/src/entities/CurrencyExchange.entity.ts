import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '../enums/currencies.enums';

@Entity()
export class CurrencyExchangeEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: 'enum',
    enum: CRYPTO_CURRENCIES,
  })
  fromCurrency: CRYPTO_CURRENCIES;

  @Column({
    type: 'float',
  })
  fromAmount: number;

  @Column({
    type: 'enum',
    enum: FIAT_CURRENCIES,
  })
  toCurrency: FIAT_CURRENCIES;

  @Column({
    type: 'float',
  })
  toAmount: number;

  @Column({
    type: 'datetime',
  })
  time: Date;

  @Column()
  type: 'Live Price' | 'Exchanged';
}
