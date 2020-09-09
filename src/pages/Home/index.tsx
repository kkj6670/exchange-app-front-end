import React, { useEffect, useState, useCallback } from 'react';

import { getProductList, ProductList } from 'lib/api';


import VisualSlider from './VisualSlider';
import RankList from './RankList';
import ProductTable from './ProductTable';

import { Div } from 'styled/base';

function Home() {
  const [productList, setProductList] = useState<ProductList[]>([]);

  const requestProductList = useCallback( async () => {
    try {
      const result = await getProductList();

      if(result.status !== 200) throw result;

      setProductList(result.data);
    } catch (error) {
      alert(error.message);
    }
  }, [setProductList]);

  useEffect( () => {
    requestProductList();
  }, [requestProductList]);

  return (
    <>
      <VisualSlider
        list={[]}
      />
      <Div width='90%' margin='0 auto'>
        <RankList list={productList} />
        <ProductTable list={productList} />
      </Div>
    </>
  );
};

export default Home;
