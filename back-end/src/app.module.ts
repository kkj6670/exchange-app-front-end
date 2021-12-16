import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TradeModule } from './trade/trade.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProductModule, TradeModule, DashboardModule],
})
export class AppModule {}
