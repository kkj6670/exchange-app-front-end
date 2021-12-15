import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradeAggregateDto } from './dto/create-trade-aggregate.dto';
import { TradeAggregateRepository } from './tradeAggregate.repository';

@Injectable()
export class TradeAggregateService {
  constructor() {}
}
