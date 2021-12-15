import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradeRepository } from 'src/trade/trade.repository';
import { TradeService } from 'src/trade/trade.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(TradeRepository)
    private tradeRepository: TradeRepository,
  ) {}

  getAllProduct() {
    return this.productRepository.find();
  }

  async getProductById(id: number) {
    const found = await this.productRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Product Not Found - id: ${id}`);
    }

    return found;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { code, nameEn, nameKr } = createProductDto;

    const product = this.productRepository.create({
      code,
      nameEn,
      nameKr,
    });

    console.log(product);

    await this.productRepository.save(product);
    return product;
  }

  async createProducts(createProductDto: CreateProductDto[]) {
    const products = this.productRepository.create(createProductDto);

    await this.productRepository.save(products);
    return products;
  }

  deleteProduct(id: number): void {
    // const found = this.productRepository.getId();
  }
  /*
  "nameKr": "이더리움",
  "productCode": "ETHKRW",
  "productName": "ETH/KRW",
  "tradePrice": 413600,
  "tradeFunds24H": "220084590.71",
  "growthRate": 5.537126818065833,
  "imgUrl": "/exchange-app/img/ETH.png",
  "preferred": 0,
  "price30D": [
    {
      "high": 277500,
      "volume": 558.9815999999996,
      "low": 267700,
      "date": 1593561600,
      "close": 276500,
      "open": 269700
    }
  ]
*/
  async getMainProductList() {
    const allProduct = await this.getAllProduct();

    const test = await this.tradeRepository.lastPriceList();

    console.log(test);

    // return 123;
  }
}
