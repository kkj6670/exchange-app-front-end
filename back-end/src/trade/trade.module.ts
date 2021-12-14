import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { TradeRepository } from './trade.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRepository])],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
