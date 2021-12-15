import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TradeAggregateController } from './tradeAggregate.controller';
import { TradeAggregateService } from './tradeAggregate.service';
import { TradeAggregateRepository } from './tradeAggregate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TradeAggregateRepository])],
  controllers: [TradeAggregateController],
  providers: [TradeAggregateService],
})
export class TradeModule {}
