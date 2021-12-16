import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan } from 'typeorm';
import { CreateTradeAggregateDto } from './dto/create-trade-aggregate.dto';
import { TradeAggregateRepository } from './tradeAggregate.repository';

@Injectable()
export class TradeAggregateService {
  constructor(
    @InjectRepository(TradeAggregateRepository)
    private tradeAggregateRepository: TradeAggregateRepository,
  ) {}

  getAggregate(day = 1) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    // const targetDate = `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
    const targetDate = '2021-11-18';

    return this.tradeAggregateRepository.find({
      where: {
        timestamp: MoreThan(targetDate),
      },
    });
  }

  createsAggregate(createAggregate: CreateTradeAggregateDto) {
    const filter = {
      ...createAggregate,
      timestamp: new Date(createAggregate.timestamp),
    };

    const aggregate = this.tradeAggregateRepository.create(filter);

    this.tradeAggregateRepository.save(aggregate);
    return aggregate;
  }

  createsAggregates(createAggregates: CreateTradeAggregateDto[]) {
    const filter = createAggregates.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));

    const aggregates = this.tradeAggregateRepository.create(filter);

    this.tradeAggregateRepository.save(aggregates);
    return aggregates;
  }
}
