import React, { useEffect, useCallback, useMemo } from 'react';

import VisualSlider from './VisualSlider';
import RankList from './RankList';
import ProductTable from './ProductTable';

import { getProductList, ProductList } from 'lib/api';

import { Div } from 'styled/base';
import useApi from 'lib/hook/useApi';

function Home() {
  const [productData, productError, productRequest] = useApi<ProductList[]>(getProductList);

  useEffect(() => {
    if (!productError) return;
    alert(productError.message);
  }, [productError]);

  useEffect(() => {
    productRequest();
  }, [productRequest]);

  const visualData = useMemo(
    () => [
      {
        src: '/exchange-app/img/visual_01.jpg',
        name: 'visual_01',
      },
      {
        src: '/exchange-app/img/visual_02.png',
        name: 'visual_02',
      },
    ],
    [],
  );

  return (
    <>
      <VisualSlider list={visualData} />
      <Div width='90%' margin='0 auto'>
        <RankList list={productData} />
        <ProductTable list={productData} productRequest={productRequest} />
      </Div>
    </>
  );
}

export default Home;
