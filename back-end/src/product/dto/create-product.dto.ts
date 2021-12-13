import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  nameKr: string;

  @IsNotEmpty()
  nameEn: string;
}

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  id: string;
}
