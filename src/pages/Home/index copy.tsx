import React, { useEffect, useState, useCallback } from 'react';

import { getProductList, getVisualList, ProductList, VisualList } from 'lib/api';


import VisualSlider from './VisualSlider';
import RankList from './RankList';
import ProductTable from './ProductTable';

import { Div } from 'styled/base';
import useApi from 'lib/hook/useApi';

function Home() {
  const [productList, setProductList] = useState<ProductList[]>([]);
  const [visualList, setVisualList] = useState<VisualList[]>([]);

  // const [data, error, call] = useApi<ProductList[]>(getProductList);
  
  // useEffect( () => {
  //   alert(error);
  // }, [error]);

  const requestProductList = useCallback( async () => {
    try {
      const result = await getProductList();
      
      if(result.status !== 200) throw result;

      setProductList(result.data);
    } catch (error) {
      alert(error.message);
    }
  }, [setProductList]);

  const requestVisualImg = useCallback( async () => {
    try {
      const result = await getVisualList();

      if(result.status !== 200) throw result;
      setVisualList(result.data);
    } catch (error) {
      alert(error.message);
    }
  }, [setVisualList]);

  const initData = useCallback( async () => {
    await Promise.all([requestProductList(), requestVisualImg()]);
  }, [requestProductList, requestVisualImg]);

  useEffect( () => {
    initData();
  }, [initData]);

  return (
    <>
      <VisualSlider list={visualList} />
      <Div width='90%' margin='0 auto'>
        <RankList list={productList} />
        <ProductTable list={productList} />
      </Div>
    </>
  );
};

export default Home;
