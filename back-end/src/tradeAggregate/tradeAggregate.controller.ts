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
import { CreateTradeAggregateDto } from './dto/create-trade-aggregate.dto';
import { TradeAggregateService } from './tradeAggregate.service';

@Controller('TradeAggregate')
export class TradeAggregateController {
  constructor(private tradeAggregateService: TradeAggregateService) {}

  @Post()
  createsAggregate(@Body() createAggregate: CreateTradeAggregateDto) {
    return this.tradeAggregateService.createsAggregate(createAggregate);
  }

  @Post()
  createsAggregates(@Body() createAggregates: CreateTradeAggregateDto[]) {
    return this.tradeAggregateService.createsAggregates(createAggregates);
  }
}
