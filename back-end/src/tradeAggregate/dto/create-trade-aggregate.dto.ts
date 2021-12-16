import { IsNotEmpty } from 'class-validator';

export class CreateTradeAggregateDto {
  @IsNotEmpty()
  market: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  trade_price: number;

  @IsNotEmpty()
  candle_acc_trade_price: number;

  @IsNotEmpty()
  candle_acc_trade_volume: number;
}
