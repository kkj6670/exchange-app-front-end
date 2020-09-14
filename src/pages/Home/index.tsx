import React, { useEffect, useState, useCallback } from 'react';

import VisualSlider from './VisualSlider';
import RankList from './RankList';
import ProductTable from './ProductTable';

import { getProductList, getVisualList, ProductList, VisualList } from 'lib/api';

import { Div } from 'styled/base';
import useApi from 'lib/hook/useApi';

function Home() {
  // const [productList, setProductList] = useState<ProductList[]>([]);
  // const [visualList, setVisualList] = useState<VisualList[]>([]);
  
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
  
  // useEffect( () => {
  //   alert(error);
  // }, [error]); 

  // const requestProductList = useCallback( async () => {
  //   try {
  //     const result = await getProductList();
      
  //     if(result.status !== 200) throw result;

  //     setProductList(result.data);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }, [setProductList]);

  // const requestVisualImg = useCallback( async () => {
  //   try {
  //     const result = await getVisualList();

  //     if(result.status !== 200) throw result;
  //     setVisualList(result.data);
  //   } catch (error) {
  //     alert(error.message); 
  //   }
  // }, [setVisualList]);
  
  useEffect( () => {
    initData();
  }, [initData]);

  return (
    <>
      <VisualSlider list={visualData} />
      <Div width='90%' margin='0 auto'>
        <RankList list={productData} />
        <ProductTable list={productData} />
      </Div>
    </>
  );
};

export default Home;
