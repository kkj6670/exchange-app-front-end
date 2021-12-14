import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

import { TradeService } from '../trade/trade.service';
import { TradeRepository } from 'src/trade/trade.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    TypeOrmModule.forFeature([TradeRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductService, TradeService],
})
export class ProductModule {}
