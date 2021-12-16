import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { TradeRepository } from '../trade/trade.repository';
import { ProductRepository } from '../product/product.repository';
import { TradeAggregateRepository } from '../tradeAggregate/tradeAggregate.repository';

import { ProductService } from '../product/product.service';
import { TradeAggregateService } from '../tradeAggregate/tradeAggregate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TradeRepository, ProductRepository, TradeAggregateRepository]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, ProductService, TradeAggregateService],
})
export class DashboardModule {}
