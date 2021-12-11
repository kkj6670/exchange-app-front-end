import React, { useEffect, useCallback } from 'react';

import VisualSlider from './VisualSlider';
import RankList from './RankList';
import ProductTable from './ProductTable';

import { getProductList, getVisualList, ProductList, VisualList } from 'lib/api';

import { Div } from 'styled/base';
import useApi from 'lib/hook/useApi';

function Home() {
  
  const [ productData, productError, productRequest ] = useApi<ProductList[]>(getProductList);

  const [ visualData, visualError, visualRequest ] = useApi<VisualList[]>(getVisualList);

  useEffect( () => {
    if(!productError) return;
    alert(productError.message); 
  }, [productError]);

  useEffect( () => {
    if(!visualError) return;
    alert(visualError.message);
  }, [visualError]);

  const initData = useCallback( async () => {
    await Promise.all([ productRequest(), visualRequest() ]);
  }, [productRequest, visualRequest]);
  
  useEffect( () => {
    initData();
  }, [initData]);

  return (
    <>
      <VisualSlider list={visualData} />
      <Div width='90%' margin='0 auto'>
        <RankList list={productData} />
        <ProductTable list={productData} productRequest={productRequest}/>
      </Div>
    </>
  );
};

export default Home;
