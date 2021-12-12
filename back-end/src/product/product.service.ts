import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

// "nameKr": "이더리움",
// "productCode": "ETHKRW",
// "productName": "ETH/KRW",
// "tradePrice": 413600,
// "tradeFunds24H": "220084590.71",
// "growthRate": 5.537126818065833,
// "imgUrl": "/exchange-app/img/ETH.png",
// "preferred": 0,
// "price30D": [
//   {
//     "high": 277500,
//     "volume": 558.9815999999996,
//     "low": 267700,
//     "date": 1593561600,
//     "close": 276500,
//     "open": 269700
//   },

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService) {}

  getProducts() {
    const products = this.httpService
      .get('https://api.upbit.com/v1/market/all?isDetails=false', {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((res) => {
          return res.data.filter((item) => item.market.includes('KRW-'));
        }),
      );

    return products;
  }

  getCandles(market = '', count = 1) {
    const candle = this.httpService
      .get(
        `https://api.upbit.com/v1/candles/days?market=${market}&count=${count}`,
        {
          headers: { Accept: 'application/json' },
        },
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );

    return candle;
  }

  getTicker(markets = []) {
    const ticker = this.httpService
      .get(`https://api.upbit.com/v1/ticker?markets=${markets.join(',')}`, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );

    return ticker;
  }

  getMainProducts() {
    const products = this.getProducts();

    products
      .pipe(
        map((list) => {
          const nextList = [...list];
          nextList.forEach((item) => {
            const candles = this.getCandles(item.market, 30);
            candles.forEach((a) => {
              console.log(a);
            });
          });

          return nextList;
        }),
      )
      .forEach((a) => console.log(a));
  }
}
