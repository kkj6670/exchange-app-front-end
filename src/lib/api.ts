import axios from 'axios';
import config from 'config';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

interface BaseResponse {
  status: number;
  code: number;
  data: object[];
};

interface ProductListRes extends BaseResponse {
  data: ProductList[];
};

export interface ProductList {
  nameKr: string;
  productCode: string;
  productName: string;
  tradePrice: number;
  tradeFunds24H: string;
  growthRate: number;
  price30D: Price30D[];
};

export interface Price30D {
  high: number;
  volume: number;
  low: number;
  date: number;
  close: number;
  open: number; 
};

interface VisualListRes extends BaseResponse {
  data: VisualList[];
};

export interface VisualList {
  src: string;
  name: string;
};


export const getProductList = () => axios.get<ProductListRes>('productList.json')
.then(res => res.data)
.catch(err => { throw err });

export const getVisualList = () => axios.get<VisualListRes>('visualList.json')
.then(res => res.data)
.catch(err => { throw err });