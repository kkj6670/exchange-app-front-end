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
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradeService } from './trade.service';

@Controller('Trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Post('create')
  createTrade(@Body() createTrade: CreateTradeDto) {
    return this.tradeService.createTrade(createTrade);
  }

  @Post('creates')
  createTrades(@Body() createTrades: CreateTradeDto[]) {
    return this.tradeService.createTrades(createTrades);
  }
}
