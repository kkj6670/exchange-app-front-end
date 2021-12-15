import { IsNotEmpty } from 'class-validator';

export class CreateTradeAggregateDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  high: number;

  @IsNotEmpty()
  low: number;

  @IsNotEmpty()
  open: number;

  @IsNotEmpty()
  close: number;

  @IsNotEmpty()
  price: number;
}
