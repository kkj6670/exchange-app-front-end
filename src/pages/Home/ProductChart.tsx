import React, { useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { ProductOhlc } from 'lib/api';
import { Div, FlexContainer, ColorList } from 'styled/base';
import { comma } from 'lib/utils';

const CHART_OPTIONS = {
  legend: false,
  tooltips: {
    enabled: false,
  },
  maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  scales: {
    yAxes: [{
      ticks: {
        callback: (value: string) => comma(value),
        beginAtZero: true,
        // maxTicksLimit: 1000,
      },
    }],
    xAxes: [{
      display: false,
    }]
  },
};

interface DateButton {
  isActive: boolean;
};

const DateButton = styled.button<DateButton>`
  color: ${props => props.isActive ? props.theme.activeColor : props.theme.color};
  background: transparent;
  font-size: 18px;
  margin-left: 25px;
  border-bottom: 2px solid transparent;
  padding-bottom: 5px;
  border-color: ${props => props.isActive && props.theme.activeColor};
  :hover {
    color: ${props => props.theme.activeColor};
  }
`;

interface ProductChart {
  data?: ProductOhlc[];
  onDateClick: Function;
};

function ProductChart({ data = [], onDateClick }: ProductChart) {
  const [selectedDate, selectDate] = useState<string>('1H');
  console.log(data,'차트데이터');

  const chartData = useCallback( (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    const gradientBorder = ctx?.createLinearGradient(0,0,canvas.width-100,0);
    const gradientBg = ctx?.createLinearGradient(0,0,0,canvas.height);
    
    gradientBorder?.addColorStop(0, ColorList.yellow01);
    gradientBorder?.addColorStop(1, ColorList.yellow02);
  
    gradientBg?.addColorStop(0, ColorList.yellowRgba01);
    gradientBg?.addColorStop(1, ColorList.yellowRgba02);

    return {
      labels: data.map(({ date }: ProductOhlc) => date),
      datasets: [
        {
          lineTension: 0.1,
          backgroundColor: gradientBg,
          borderColor: gradientBorder,
          pointRadius: 0,
          data: data.map(({ close }: ProductOhlc) => close),
        }
      ]
    };
  }, [data]);
  
  const handleDateClick = useCallback( (date: React.MouseEvent) => {
    const text = date.currentTarget.textContent;
    if(!text) return;
    onDateClick(text);
    selectDate(text);
  }, [onDateClick, selectDate]);

  return (
    <Div width='100%'>
      <FlexContainer justifyContent='flex-end' align-items='center'>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1H'}>1H</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1D'}>1D</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1W'}>1W</DateButton>
      </FlexContainer>
      <Div height='300px'>
        <Line
          data={chartData}
          options={CHART_OPTIONS}
          key='date'
          redraw
        />
      </Div>
    </Div>
  );
};

export default ProductChart;
