import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('main')
  getMainProducts() {
    return this.productService.getMainProducts();
  }

  @Get('tick')
  productTick(): object[] {
    return [{ a: 1 }];
  }
}
