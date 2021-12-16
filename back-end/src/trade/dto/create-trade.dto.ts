import { IsNotEmpty } from 'class-validator';

export class CreateTradeDto {
  @IsNotEmpty()
  market: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  trade_price: number;

  @IsNotEmpty()
  trade_volume: number;
}
