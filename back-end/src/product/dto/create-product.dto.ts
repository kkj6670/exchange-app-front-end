import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  market: string;

  @IsNotEmpty()
  korean_name: string;

  @IsNotEmpty()
  english_name: string;
}

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  id: string;
}
