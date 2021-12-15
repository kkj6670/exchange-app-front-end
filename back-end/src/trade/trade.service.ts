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
    const { code, timestamp, trade_price, trade_volume } = createTrade;
    const trade = this.tradeRepository.create({
      code,
      timestamp,
      trade_price,
      trade_volume,
    });

    this.tradeRepository.save(trade);

    return trade;
  }

  async createTrades(createTrades: CreateTradeDto[]) {
    createTrades.forEach((item) => {
      item.timestamp = new Date(item.timestamp);
    });
    const trade = this.tradeRepository.create(createTrades);

    this.tradeRepository.save(trade);

    return trade;
  }
}
