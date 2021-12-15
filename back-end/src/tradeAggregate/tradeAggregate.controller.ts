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
import {} from './dto/create-trade-aggregate.dto';
import { TradeAggregateService } from './tradeAggregate.service';

@Controller('Trade')
export class TradeAggregateController {
  constructor(private tradeAggregateService: TradeAggregateService) {}
}
