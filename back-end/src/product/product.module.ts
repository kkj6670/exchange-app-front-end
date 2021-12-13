import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

export interface IProduct {
  id: string;
  code: string;
  nameKr: string;
  nameEn: string;
}

export interface ICandle {
  hight: number;
  volume: number;
  low: number;
  date: number;
  close: number;
  open: number;
}

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
