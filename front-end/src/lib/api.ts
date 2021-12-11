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
  imgUrl: string;
  preferred: number;
  price30D: ProductOhlc[];
};


export const getProductList = () => axios
.get<ProductListRes>(`/productList.json`)
.then(res => res.data)
.catch(err => { throw err });

interface VisualListRes extends BaseResponse {
  data: VisualList[];
};

export interface VisualList {
  src: string;
  name: string;
};

export const getVisualList = () => axios
.get<VisualListRes>('/visualList.json')
.then(res => res.data)
.catch(err => { throw err });

interface ProductTickRes extends BaseResponse {
  data: ProductOhlc[];
};

interface ProductTickReq {
  productCode: string;
  dateType: string;
  toDate: number;
};

export interface ProductOhlc {
  high: number;
  volume: number;
  low: number;
  date: number;
  close: number;
  open: number;
};

export const getProductTick = ({ productCode, dateType }: ProductTickReq) => axios
// .get<ProductTickRes>(`tick/${productCode}_${dateType}.json`)
.get<ProductTickRes>(`https://api.ap.exchange/api/ohlc/${productCode}/${dateType}?t=0`)
.then(res => ({
  status: 200,
  code: 0,
  data: res.data
}))
.catch(err => { throw err });