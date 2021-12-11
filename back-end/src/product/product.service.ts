import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [];

  getAllProducts() {
    const sdk = require('api')('@upbit/v1.2.2#1mld74kq6wh6ea');
    sdk.config({ parseResponse: false });
    sdk
      .get('/v1/market/all')
      .then((result) => console.log(result, 'result'))
      .catch((err) => console.log(err, '에러임'));
    console.log('1');

    // sdk['마켓-코드-조회']({ isDetails: 'false' })
    //   .then((res) => console.log(res))
    //   .catch((err) => {
    //     console.log('여기?');
    //     console.error(err);
    //   });

    return this.products;
  }
}
