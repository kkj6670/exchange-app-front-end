import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

import { comma } from 'lib/utils';
import { ProductList, Price30D } from 'lib/api';

import { Div, Text, FlexContainer, FlexItems, ColorList } from 'styled/base';
import BasicTable, { ColumnDefs } from 'components/BasicTable';

const CardWrap = styled.ul`
  width: 100%;
  height: 150px;
`;

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

const columnDefs: ColumnDefs[] = [
  {
    id: 'productName',
    name: '상품명',
    width: '20%',
    align: 'left',
    parser: ({ nameKr, productName }: ProductList) => {
      return <><Text>{nameKr}</Text><Text weight='normal'>{productName}</Text></>;
    },
  },
  {
    id: 'tradePrice',
    name: '가격',
    width: '20%',
    align: 'right',
    parser: ({ tradePrice }: ProductList) => `${comma(tradePrice)}`,
  },
  {
    id: 'growthRate',
    name: '전일대비',
    width: '20%',
    align: 'right',
    parser: ({ growthRate }: ProductList) => {
      const rate = +growthRate.toFixed(2);
      const textColor = rate < 0 ? ColorList.blue01 : ColorList.red01;
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
    parser: ({ tradeFunds24H }: ProductList) => `${comma(tradeFunds24H.split('.')[0])}원`,
  },
  {
    id: 'priceGraph',
    name: '30일 동향',
    width: '20%',
    align: 'right',
    parser: ({ price30D }: ProductList) => {
      const data = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx?.createLinearGradient(0,0,canvas.width-100,0);
        
        gradient?.addColorStop(0, ColorList.yellow01);
        gradient?.addColorStop(1, ColorList.yellow02);
      
        return {
          labels: price30D.map(({ date }: Price30D) => date),
          datasets: [
            {
              fill: false,
              lineTension: 0.1,
              borderColor: gradient,
              pointRadius: 0,
              data: price30D.map(({ close }: Price30D) => close),
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

interface ProductTable {
  list: ProductList[];
};

const TabsWrap = styled(FlexItems)`
  display: flex;
  flex: 80;
`;

const SearchWrap = styled(FlexItems)`
  flex: 20;
`;


function ProductTable({ list }: ProductTable) {
  return(
    <Div>
      <FlexContainer>
        <TabsWrap>
          <Div as='button'>1</Div>
          <Div as='button'>2</Div>
          <Div as='button'>3</Div>
        </TabsWrap>
        <SearchWrap>
          
        </SearchWrap>
      </FlexContainer>
      <BasicTable
        columnDefs={columnDefs}
        rowData={list}
        uniqueKey={UNIQUE_KEY}
        selectMode
      />
    </Div>
  );
};

export default ProductTable;
