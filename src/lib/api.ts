import axios from 'axios';
import config from 'config';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

interface BaseResponse {
  status: number;
  code: number;
  data: object[];
}

interface ProductListRes extends BaseResponse {
  data: ProductList[];
}

export interface ProductList {
  id: number;
  market: string;
  korean_name: string;
  english_name: string;
  change_rate: number;
  trade_price: number;
  tradeFunds24H: number;
  price30D: ProductOhlc[];
}

export const getProductList = () =>
  axios
    .get('/dashboard/main')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export interface ProductOhlc {
  market: string;
  timestamp: string;
  trade_price: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}
