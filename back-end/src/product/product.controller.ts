import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductValidationPipe } from './pipes/ProductValidationPipe';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('/:id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createProduct(@Body(ProductValidationPipe) createProduct: CreateProductDto) {
    return this.productService.createProduct(createProduct);
  }

  @Post('/creates')
  @UsePipes(ValidationPipe)
  createProducts(@Body(ProductValidationPipe) createProduct: CreateProductDto[]) {
    return this.productService.createProducts(createProduct);
  }

  @Post('/creates')
  deleteProduct(@Body() id: number) {
    return this.productService.deleteProduct(id);
  }
}
