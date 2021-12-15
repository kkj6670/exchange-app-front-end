import { EntityRepository, Repository } from 'typeorm';
import { TradeAggregate } from './tradeAggregate.entity';

@EntityRepository(TradeAggregate)
export class TradeAggregateRepository extends Repository<TradeAggregate> {}
