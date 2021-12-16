import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

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

  async createProduct(createProductDto: CreateProductDto) {
    const { market, english_name, korean_name } = createProductDto;

    const product = this.productRepository.create({
      market,
      english_name,
      korean_name,
    });

    await this.productRepository.save(product);
    return product;
  }

  async createProducts(createProductDto: CreateProductDto[]) {
    const products = this.productRepository.create(createProductDto);

    await this.productRepository.save(products);
    return products;
  }

  deleteProduct(id: number): void {
    const found = this.productRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Product Not Found - id: ${id}`);
    }

    this.productRepository.delete({ id });
  }
}
