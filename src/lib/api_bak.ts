import axios from 'axios';
import config from 'config';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

interface test {
  status: number;
  code: number;
  error?: Error;
};

interface test2 extends test {
  data: ProductList[];
};

export interface ProductList {
  productCode?: string;
  productName?: string;
  tradePrice?: number;
  tradeFunds24H?: string;
  growthRate?: number;
};

export const getProductList = (data?: object) => axios.get<test2>('productList.json', data)
.then(res => res.data)
.catch((err: Error) => ({ status: 0, code: 0, data: [], error: err }));