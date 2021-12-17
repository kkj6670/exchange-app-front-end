import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradeAggregateService } from '../tradeAggregate/tradeAggregate.service';
import { ProductService } from '../product/product.service';
import { TradeRepository } from '../trade/trade.repository';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(TradeRepository)
    private tradeRepository: TradeRepository,
    private productService: ProductService,
    private tradAggregateService: TradeAggregateService,
  ) {}

  mainProductList() {
    return Promise.all([
      this.productService.getAllProduct(),
      this.tradeRepository.currentPriceList(),
      this.tradAggregateService.getAggregate(30),
      this.tradeRepository.currentFunds24H(),
    ]).then((result) => {
      const [productList, currentPriceList, aggregateList, funds24H] = result;

      const price30DObj = aggregateList.reduce((cur, acc) => {
        if (cur[acc.market] === undefined) cur[acc.market] = [];
        cur[acc.market].push(acc);
        return cur;
      }, {});

      const lastPriceObj = currentPriceList.reduce((cur, acc) => {
        cur[acc.market] = acc.trade_price;
        return cur;
      }, {});

      const funds24HObj = funds24H.reduce((cur, acc) => {
        cur[acc.market] = acc.tradefunds24h;
        return cur;
      }, {});

      const list = productList.map((product) => {
        const trade_price: number = +lastPriceObj[product.market].toFixed(2);
        const tradeFunds24H: number = +funds24HObj[product.market].toFixed(2);
        const price30D = price30DObj[product.market];
        const change_rate: number = +(
          ((trade_price - price30D[price30D.length - 1].trade_price) / trade_price) *
          100
        ).toFixed(2);

        return {
          ...product,
          change_rate,
          trade_price,
          tradeFunds24H,
          price30D,
        };
      });

      return list;
    });
  }
}
