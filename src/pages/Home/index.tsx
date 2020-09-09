import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';

import { getProductList, IProductList, IPrice30D } from 'lib/api';
import useApi from 'lib/hook/useApi';
import { comma } from 'lib/utils';

import VisualSlider from './VisualSlider';
import ChartList from './ChartList';

import { Div, Text } from 'styled/base';
import BasicTable, { IColumnDefs } from 'components/BasicTable';

const UNIQUE_KEY = 'productCode';

const options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  hover: {
    mode: null,
  },
  maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  scales: {
    yAxes: [{
      display: false,
      gridLines: {
        display: false,
      },
    }],
    xAxes: [{
      display: false,
      gridLines: {
        display: false,
      },
    }]
  },
};

const columnDefs: IColumnDefs[] = [
  {
    id: 'productName',
    name: '상품명',
    width: '20%',
    align: 'left',
    parser: ({ nameKr, productName }: IProductList) => {
      return <><Text>{nameKr}</Text><Text weight='normal'>{productName}</Text></>;
    },
  },
  {
    id: 'tradePrice',
    name: '가격',
    width: '20%',
    align: 'right',
    parser: ({ tradePrice }: IProductList) => `${comma(tradePrice)}`,
  },
  {
    id: 'growthRate',
    name: '전일대비',
    width: '20%',
    align: 'right',
    parser: ({ growthRate }: IProductList) => {
      const rate = +growthRate.toFixed(2);
      const textColor = rate < 0 ? '#4386f9' : '#f75467';
      return (
        <Text color={textColor}>{rate < 0 ? rate : `+${rate}`}%</Text>
      );
    },
  },
  {
    id: 'tradeFunds24H',
    name: '거래대금',
    width: '20%',
    align: 'right',
    parser: ({ tradeFunds24H }: IProductList) => `${comma(tradeFunds24H.split('.')[0])}원`,
  },
  {
    id: 'priceGraph',
    name: '30일 동향',
    width: '20%',
    align: 'right',
    parser: ({ price30D }: IProductList) => {
      const data = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx?.createLinearGradient(0,0,canvas.width-100,0);
        
        gradient?.addColorStop(0,'#fec91e');
        gradient?.addColorStop(1,'#af8702');
      
        return {
          labels: price30D.map(({ date }: IPrice30D) => date),
          datasets: [
            {
              fill: false,
              lineTension: 0.1,
              borderColor: gradient,
              pointRadius: 0,
              data: price30D.map(({ close }: IPrice30D) => close),
            }
          ]
        };
      };

      return (
        <Div height='70px'>
          <Line
            data={data}
            options={options}
          />
        </Div>
      );
    }
  }
];

function Home() {
  // const [data, error, requestData] = useApi(getProductList);

  const [productList, setProductList] = useState<IProductList[]>([]);

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
      <VisualSlider />
      <Div width='90%' margin='0 auto'>
        <ChartList
          list={productList}
        />
        <BasicTable
          columnDefs={columnDefs}
          rowData={productList}
          uniqueKey={UNIQUE_KEY}
          selectMode
        />
      </Div>
    </>
  );
};

export default Home;
