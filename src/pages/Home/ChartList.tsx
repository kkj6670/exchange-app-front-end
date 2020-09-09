import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

import { IProductList } from 'lib/api';

import { Text, Div } from 'styled/base';

const CardWrap = styled.ul`
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
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
        opacity: 0.5;
      }
    }
  }
`;

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

const data = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  const gradientBorder = ctx?.createLinearGradient(0,0,canvas.width-100,0);
  const gradientBg = ctx?.createLinearGradient(0,0,0,canvas.height);
  
  gradientBorder?.addColorStop(0,'#fec91e');
  gradientBorder?.addColorStop(1,'#af8702');

  gradientBg?.addColorStop(0,'rgba(254,201,30,0.5)');
  gradientBg?.addColorStop(1,'rgba(254,201,30,0.1)');

  return {
    labels: [1,2,3,4,5],
    datasets: [
      {
        lineTension: 0.1,
        backgroundColor: gradientBg,
        borderColor: gradientBorder,
        pointRadius: 0,
        data: [100000,100000,100000,100000,100000],
      }
    ]
  };
};

// return (
//   <Div width='100%' height='70px'>
//     <Line
//       data={data}
//       options={options}
//     />
//   </Div>
// );

interface IChartList {
  list: IProductList[];
};

function ChartList({ list }: IChartList) {

  // const list = useMemo( () => {
  //   return (
  //     <li>
        
  //     </li>
  //   );
  // }, [list]);

  return(
    <CardWrap>
      <li>
        <Text size='1.2rem;'>이더리움 ETH/KRW</Text>
        <Text size='1.5rem' color='#f75467' weight='bold'>200000 원</Text>
        <Text as='span' width='fit-content' align='center' color='#fff' backgroundColor='#f75467' padding='0.2rem 1rem' borderRadius='7px'>+5%</Text>
        <Div>
          <Line
            options={options}
            data={data}
          />
        </Div>
      </li>
    </CardWrap>
  );
};

export default ChartList;
