import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

import { ProductList, Price30D } from 'lib/api';
import { comma } from 'lib/utils';

import { FlexContainer, FlexItems, Text, Div, ColorList } from 'styled/base';

const CardWrap = styled.ul`
  width: 100%;
  height: 150px;
  border-radius: 7px;
  display: flex;
  > li {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 23.5%;
    height: 100%;
    padding: 15px;
    margin-right: 2%;
    position: relative;
    border: 1px solid ${props => props.theme.tableBorderColor};
    border-radius: 7px;
    box-shadow: 0 0 7px ${props => props.theme.tableBorderColor};
    cursor: pointer;
    transition-duration: 200ms;
    :hover {
      transform: translateY(-7px);
      box-shadow: 0 7px 7px ${props => props.theme.tableBodyBg};
    }
    :last-child {
      margin-right: 0;
    }
    > div:last-child {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background-color: ${props => props.theme.tableBodyBg};
      > canvas {
        opacity: 0.4;
      }
    }
  }
`;

const CHART_OPTIONS = {
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

interface RankList {
  list?: ProductList[];
};

function RankList({ list = [] }: RankList) {
  const [filterList, setFilterList] = useState<ProductList[]>([]);

  useEffect( () => {
    if(list.length === 0) return;
    const sortList = [...list];
    const listLen = list.length-1;
    sortList.sort( (a,b) => a.growthRate < b.growthRate ? 1 : -1);
    setFilterList([
      sortList[0],
      sortList[1],
      sortList[listLen],
      sortList[listLen-1],
    ]);
  }, [list]);

  const cardList = useMemo( () => filterList.map( item => {
    const fixedRate = item.growthRate.toFixed(2);

    const [rate, color] = item.growthRate > 0 
    ? [`+${fixedRate}`, ColorList.red01] 
    : [`${fixedRate}`, ColorList.blue01];

    const data = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      const gradientBorder = ctx?.createLinearGradient(0,0,canvas.width-100,0);
      const gradientBg = ctx?.createLinearGradient(0,0,0,canvas.height);
      
      gradientBorder?.addColorStop(0, ColorList.yellow01);
      gradientBorder?.addColorStop(1, ColorList.yellow02);
    
      gradientBg?.addColorStop(0, ColorList.yellowRgba01);
      gradientBg?.addColorStop(1, ColorList.yellowRgba02);
    
      return {
        labels: item.price30D.map(({ date }: Price30D) => date),
        datasets: [
          {
            lineTension: 0.1,
            backgroundColor: gradientBg,
            borderColor: gradientBorder,
            pointRadius: 0,
            data: item.price30D.map(({ close }: Price30D) => close),
          }
        ]
      };
    };

    return (
      <li key={item.productCode}>
        <Text weight='bold'>
          {item.nameKr}
          <Text as='span'weight='normal' margin='0 0 0 0.5rem' size='0.85rem'>{item.productName}</Text>
        </Text>
        <Text size='1.5rem' color={color} weight='bold'>{comma(item.tradePrice)}원</Text>
        <Div>
          <Text
            as='span'
            align='center'
            color='#fff'
            backgroundColor={color}
            padding='0.2rem 0.5rem'
            borderRadius='7px'
          >
            {rate}%
          </Text>
        </Div>
        <Div>
          <Line
            options={CHART_OPTIONS}
            data={data}
          />
        </Div>
      </li>
    );
  }), [filterList]);

  return(
    <Div padding='0 0 20px 0'>
      <FlexContainer margin='0 0 20px 0'>
        <FlexItems flex='51' padding='0 0 0 7px' as={Text} size='1.2rem' weight='bold'>Best 24H</FlexItems>
        <FlexItems flex='49' padding='0 0 0 7px' as={Text} size='1.2rem' weight='bold'>Worst 24H</FlexItems>
      </FlexContainer>
      <CardWrap>
        {cardList}
      </CardWrap>
    </Div>
  );
};

export default RankList;
