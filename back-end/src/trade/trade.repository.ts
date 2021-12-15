import { EntityRepository, Repository } from 'typeorm';
import { Trade } from './trade.entity';

@EntityRepository(Trade)
export class TradeRepository extends Repository<Trade> {
  lastPriceList() {
    return this.createQueryBuilder('trade')
      .distinctOn(['trade.code'])
      .orderBy({ 'trade.code': 'ASC', 'trade.timestamp': 'DESC' })
      .select(['trade.code', 'trade.trade_price'])
      .getMany();
  }
}
