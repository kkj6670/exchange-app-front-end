import { EntityRepository, Repository } from 'typeorm';
import { Trade } from './trade.entity';

@EntityRepository(Trade)
export class TradeRepository extends Repository<Trade> {
  currentPriceList() {
    return this.createQueryBuilder('trade')
      .innerJoinAndSelect('product', 'product', 'product.market = trade.market')
      .distinctOn(['trade.market'])
      .orderBy({ 'trade.market': 'ASC', 'trade.timestamp': 'DESC' })
      .select(['trade.market', 'trade.trade_price', 'product.korean_name'])
      .getMany();
  }

  currentFunds24H() {
    const targetDate = '2021-12-16 00:00:00';
    return this.createQueryBuilder('trade')
      .innerJoinAndSelect('product', 'product', 'product.market = trade.market')
      .select('trade.market, SUM(trade.trade_price * trade.trade_volume) as tradeFunds24H')
      .groupBy('trade.market')
      .where('trade.timestamp >= :targetDate', { targetDate })
      .getRawMany();
  }
}
