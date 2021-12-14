import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TradeModule } from './trade/trade.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProductModule, TradeModule],
})
export class AppModule {}
