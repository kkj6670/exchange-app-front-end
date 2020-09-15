import React, { useState, useCallback, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { ProductOhlc } from 'lib/api';
import { Div, FlexContainer, ColorList } from 'styled/base';
import { comma } from 'lib/utils';

interface TooltipItem {
  datasetIndex: number;
  index: number;
  label: string;
  value: string;
  x: number;
  xLabel: number;
  y: number;
  yLabel: number;
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
  const [selectedDate, selectDate] = useState<string>('1M');
  
  const chartData = useCallback( (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    const gradientBorder = ctx?.createLinearGradient(0,0,canvas.width-100,0);
    const gradientBg = ctx?.createLinearGradient(0,0,0,canvas.height);
    
    gradientBorder?.addColorStop(0, ColorList.yellow01);
    gradientBorder?.addColorStop(1, ColorList.yellow02);
  
    gradientBg?.addColorStop(0, ColorList.yellowRgba01);
    gradientBg?.addColorStop(1, ColorList.yellowRgba02);

    let count:number;
    const len = data.length;
    
    switch(selectedDate){
      case '1D': 
          count = 24;
        break;
      case '1W': 
          count = 24 * 7;
        break;
      case '1M': 
          count = 30;
        break;
      case '3M': 
          count = 30 * 3;
        break;
      case '6M': 
          count = 30 * 6;
        break;
      case '1Y': 
          count = 30 * 12;
        break;
      default:
          count = 30;
        break;
    }

    count = len-count < 0 ? 0 : len-count;
    return {
      labels: data.map(({ date }: ProductOhlc) => date).slice(count, len),
      datasets: [
        {
          lineTension: 0.1,
          backgroundColor: gradientBg,
          borderColor: gradientBorder,
          pointRadius: 0,
          data: data.map(({ close }: ProductOhlc) => close).slice(count, len),
        }
      ]
    };
  }, [data, selectedDate]);

  const chartOptions = useMemo( () => ({
    legend: false,
    lineOnHover: {
      enabled: true,
      lineColor: '#bbb',
      lineWidth: 1
    },
    tooltips: {
      enable: true,
      // mode: 'index',
      // position: 'nearest',
      intersect: false,
      callbacks: {
      label: (tooltipItem: TooltipItem, a: any) => {
        const date = new Date(tooltipItem.xLabel * 1000);
        const m = date.getMonth()+1;
        const d = date.getDate();
        const h = date.getHours();
        
        if(selectedDate === '1D' || selectedDate === '1W') return `${d}일 ${h < 10 ? '0'+h : h}:00`;
  
        return `${m}월 ${d}일`;
      },
      title: (tooltipItem: TooltipItem[]) => {
        const price = tooltipItem[0].yLabel;
        return comma(price);
      }
    }
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
        // display: false,
        ticks: {
          maxTicksLimit: 5,
          callback: (value: string) => {
            const date = new Date(+value * 1000);
            const m = date.getMonth()+1;
            const d = date.getDate();
            const h = date.getHours();

            if(selectedDate === '1D' || selectedDate === '1W') return `${d}일 ${h < 10 ? '0'+h : h}:00`;

            return `${m}/${d}`;
          },
          maxRotation: 0,
          minRotation: 0,
        },
      }]
    },
  }), [selectedDate]);
  
  const handleDateClick = useCallback( async (date: React.MouseEvent) => {
    const text = date.currentTarget.textContent;
    if(!text) return;

    const err = await onDateClick(text);
    if(err) return;

    selectDate(text);
  }, [onDateClick, selectDate]);

  return (
    <Div width='100%'>
      <FlexContainer justifyContent='flex-end' align-items='center'>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1D'}>1D</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1W'}>1W</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1M'}>1M</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '3M'}>3M</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '6M'}>6M</DateButton>
        <DateButton onClick={handleDateClick} isActive={selectedDate === '1Y'}>1Y</DateButton>
      </FlexContainer>
      <Div height='300px'>
        <Line
          data={chartData}
          options={chartOptions}
          key='date'
          redraw
        />
      </Div>
    </Div>
  );
};

export default ProductChart;
