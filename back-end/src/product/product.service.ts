import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductUpdateValidationPipe } from './pipes/ProductUpdateValidationPipe';
import { ProductRepository } from './product.repository';

// "nameKr": "이더리움",
// "productCode": "ETHKRW",
// "productName": "ETH/KRW",
// "tradePrice": 413600,
// "tradeFunds24H": "220084590.71",
// "growthRate": 5.537126818065833,
// "imgUrl": "/exchange-app/img/ETH.png",
// "preferred": 0,
// "price30D": [
//   {
//     "high": 277500,
//     "volume": 558.9815999999996,
//     "low": 267700,
//     "date": 1593561600,
//     "close": 276500,
//     "open": 269700
//   },

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
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

  // getAllProduct(): IProduct[] {
  //   return this.products;
  // }

  // getProductById(id: string): IProduct {
  //   const found = this.products.find((product) => product.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Product Not Found - ID: ${id}`);
  //   }

  //   return found;
  // }

  // createProduct(createProductDto: CreateProductDto) {
  //   const { code, nameKr, nameEn } = createProductDto;
  //   const product = {
  //     id: uuid(),
  //     code,
  //     nameKr,
  //     nameEn,
  //   };

  //   this.products.push(product);
  //   return product;
  // }

  // deleteProduct(id: string): void {
  //   let found = false;
  //   const filterList = this.products.filter((product) => {
  //     const check = product.id === id;
  //     if (check) found = true;
  //     return check;
  //   });

  //   if (!found) {
  //     throw new NotFoundException(`Product Not Found - ID: ${id}`);
  //   }

  //   this.products = filterList;
  // }

  // updateProduct(updateProductDto: UpdateProductDto): void {
  //   console.log(updateProductDto);
  //   const { id, code, nameKr, nameEn } = updateProductDto;
  //   const found = this.products.find((product) => product.id === id) || {
  //     code: '',
  //     nameKr: '',
  //     nameEn: '',
  //   };

  //   if (!found) {
  //     throw new NotFoundException(`Product Not Found - ID: ${id}`);
  //   }

  //   found.code = code;
  //   found.nameKr = nameKr;
  //   found.nameEn = nameEn;
  // }
}
