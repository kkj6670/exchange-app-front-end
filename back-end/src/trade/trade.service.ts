import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradeRepository } from './trade.repository';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(TradeRepository)
    private tradeRepository: TradeRepository,
  ) {}

  async createTrade(createTrade: CreateTradeDto) {
    const trade = this.tradeRepository.create({
      ...createTrade,
      timestamp: new Date(createTrade.timestamp),
    });

    this.tradeRepository.save(trade);

    return trade;
  }

  async createTrades(createTrades: CreateTradeDto[]) {
    const filterCreateTrades = createTrades.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));

    const trades = this.tradeRepository.create(filterCreateTrades);

    this.tradeRepository.save(trades);

    return trades;
  }
}
