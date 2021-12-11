import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('all')
  getAllProducts(): object[] {
    return this.productService.getAllProducts();
  }

  @Get('tick')
  productTick(): object[] {
    return [{ a: 1 }];
  }
}
