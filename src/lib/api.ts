import axios from 'axios';
import config from 'config';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

interface IBaseResponse {
  status: number;
  code: number;
};

interface IProductListRes extends IBaseResponse {
  data: IProductList[];
};

export interface IProductList {
  nameKr: string;
  productCode: string;
  productName: string;
  tradePrice: number;
  tradeFunds24H: string;
  growthRate: number;
  price30D: IPrice30D[];
};

export interface IPrice30D {
  high: number;
  volume: number;
  low: number;
  date: number;
  close: number;
  open: number; 
};

export const getProductList = () => axios.get<IProductListRes>('productList.json')
.then(res => res.data)
.catch(err => { throw err });