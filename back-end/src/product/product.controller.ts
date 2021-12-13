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
import { ProductUpdateValidationPipe } from './pipes/ProductUpdateValidationPipe';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.productService.createProduct(createProduct);
  }

  // @Get('/:id')
  // getProduct(@Param('id') id: string): IProduct {
  //   return this.productService.getProductById(id);
  // }

  // @Post('create')
  // @UsePipes(ValidationPipe)
  // createProduct(@Body() createProductDto: CreateProductDto): IProduct {
  //   return this.productService.createProduct(createProductDto);
  // }

  // @Post('update')
  // @UsePipes(ValidationPipe)
  // updateProduct(
  //   @Body(ProductUpdateValidationPipe) updateProductDto: UpdateProductDto,
  // ): void {
  //   return this.productService.updateProduct(updateProductDto);
  // }

  // @Delete('/:id')
  // deleteProduct(@Param('id') id: string): void {
  //   this.productService.deleteProduct(id);
  // }
}
