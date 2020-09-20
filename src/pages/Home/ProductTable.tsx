import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

import { comma } from 'lib/utils';
import { getProductTick, ProductOhlc, ProductList } from 'lib/api';
import useApi from 'lib/hook/useApi';

import { Div, Text, FlexContainer, FlexItems, ColorList } from 'styled/base';
import BasicTable, { ColumnDefs } from 'components/BasicTable';
import ProductChart from './ProductChart';

import { ReactComponent as FavoriteImg } from 'svg/icon_favorite.svg';

const TopMenu = styled(FlexContainer)`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: ${props => props.theme.tableHeaderBg};
  border-bottom: 1px solid ${props => props.theme.tableBorderColor};
  z-index: 1;
`;

const TabsWrap = styled(FlexItems)`
  display: flex;
  flex: 80;
  height: 100%;
`;

interface TabsMenu {
  isActive?: boolean;
};

const TabsMenu = styled.button<TabsMenu>`
  width: 90px;
  height: 100%;
  background-color: transparent;
  color: ${props => props.theme.color};
  font-weight: bold;
  border-bottom: 3px solid transparent;
  ${props => props.isActive ? `
    color: ${ColorList.yellow01};
    border-color: ${ColorList.yellow01};
  ` : null}
  :hover {
    color: ${ColorList.yellow01};
    border-color: ${ColorList.yellow01};
  }
`;

const SearchBox = styled.input`
  flex: 20;
  height: 70%;
  margin-right: 15px;
  background-color: transparent;
  border: 1px solid ${props => props.theme.tableBorderColor};
  color: ${props => props.theme.color};
  padding: 5px 8px;
  border-radius: 8px;
`;

const UNIQUE_KEY = 'productCode';

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

const handleFixedTable = (fixedScrollTop: number, headerHeight: number) => {
  const topMenu = document.getElementById('top_menu');
  const tableHeader = document.getElementById('table_head');
  const tableBody = document.getElementById('table_body');
  const scrollTop = document.scrollingElement?.scrollTop || 0;

  if(!topMenu || !tableHeader || !tableBody) return;

  if(fixedScrollTop <= scrollTop) {
    topMenu.style.setProperty('position','fixed');
    topMenu.style.setProperty('top',`${headerHeight}px`);
    topMenu.style.setProperty('width',`90%`);
    
    tableHeader.style.setProperty('position','fixed');
    tableHeader.style.setProperty('width','90%');
    tableHeader.style.setProperty('top',`${headerHeight + (topMenu.offsetHeight || 0)}px`);
    
    tableBody.style.setProperty('margin-top', `${(topMenu.offsetHeight || 0) + (tableHeader.offsetHeight || 0)}px`);
  } else {
    topMenu.style.removeProperty('position');
    topMenu.style.removeProperty('top');
    topMenu.style.removeProperty('width');

    tableHeader.style.removeProperty('position');
    tableHeader.style.removeProperty('top');
    tableHeader.style.removeProperty('width');

    tableBody.style.removeProperty('margin-top');
  }
};

interface ProductTable {
  list?: ProductList[];
  productRequest?: Function;
};

function ProductTable({ list = [], productRequest = () => {} }: ProductTable) {
  const searchBox = useRef() as React.MutableRefObject<HTMLInputElement>;
  
  const [menu, setMenu] = useState<string>('전체');
  const [selectedProduct, selectProduct] = useState<string>('');

  // 즐겨찾기 저장용
  // 실제 데이터 연동시 api호출해 저장후 새로 불러오는 방식으로 할지?
  // 지금 방식보다 나은 방식이 있을지?
  const [tempList, setTempList] = useState<ProductList[]>([]);
  const [filterList, setFilterList] = useState<ProductList[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const [chartData, , requestChart] = useApi<ProductOhlc[]>(getProductTick);

  useEffect( () => {
    setTempList(list);
  }, [list]);

  const handleDateClick = useCallback( async (selectDate) => {
    let dateType = '1D';
    if(selectDate === '1D' || selectDate === '1W') dateType = '1H';

    const { err } = await requestChart({ productCode: selectedProduct, dateType });

    if(err) alert(err);
    return err;
  }, [requestChart, selectedProduct]);

  const handleRowClick = useCallback( async (item: ProductList) => {
    const productCode = item.productCode.replace(/[0-9]/g,''); // 데이터 임의로 넣은거 처리
    const dateType = '1D';
    const { err } = await requestChart({ productCode, dateType });
    if(err) alert(err);
    selectProduct(productCode);
    return err;
  }, [requestChart, selectProduct]);

  useEffect( () => {
    if(!tempList) return;
    const lowerText = searchText.toLowerCase();
    const favorite = menu === '즐겨찾기' ? true : false;
    const nextList = tempList.filter( ({ nameKr, productName, preferred }) => {
      const lowerName = productName.toLowerCase();
      let check = true;

      if(
        nameKr.search(lowerText) === -1
        && lowerName.search(lowerText) === -1
      ) check = false;

      if(favorite && preferred === 0) check = false;
      
      return check;
    });
    setFilterList(nextList);
  }, [tempList, searchText, menu]);

  useEffect( () => {
    const topMenu = document.getElementById('top_menu');
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    const fixedScrollTop = (topMenu?.offsetTop || 0) - headerHeight || 0;
    const handleScrollEvent = () => handleFixedTable(fixedScrollTop, headerHeight);

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);
  
  const selectContent = useMemo( () => 
    <ProductChart 
      data={chartData}
      onDateClick={handleDateClick}
    />
  , [chartData, handleDateClick]);

  const handleFavoriteClick = (e: React.MouseEvent, productCode: string) => {
    const target = e.currentTarget;
    const isActive = target.getAttribute('data-active');
    target.setAttribute('opacity',`${isActive === '1' ? '0.3' : '1'}`);
    
    const setFavorite = tempList.map( item => {
      if(item.productCode !== productCode) return item;
      return {
        ...item,
        preferred: isActive === '1' ? 0 : 1
      };
    });

    console.log(setFavorite);
    
    setTempList(setFavorite);

    e.stopPropagation();
  }
  const tableColumnDefs: ColumnDefs<ProductList>[] = useMemo( () => ([
    {
      id: 'productName',
      name: '상품명',
      width: '20%',
      align: 'left',
      parser: ({ nameKr, productName, imgUrl, preferred, productCode }) => {
        return (
          <FlexContainer alignItems='center'>
            <FlexItems flex='10'>
              <FavoriteImg
                className='product-favorite'
                fill={ColorList.yellow01}
                opacity={!preferred ? '0.3' : '1'}
                data-active={preferred}
                width='15px'
                height='15px'
                onClick={e => handleFavoriteClick(e, productCode)}
              />
            </FlexItems>
            <FlexItems flex='20'>
              <Div as='img' width='40px' src={imgUrl} />
            </FlexItems>
            <FlexItems flex='70'>
              <Text>{nameKr}</Text>
              <Text weight='normal'>{productName}</Text>
            </FlexItems>
          </FlexContainer>
        );
      },
    },
    {
      id: 'tradePrice',
      name: '가격',
      width: '20%',
      align: 'right',
      parser: ({ tradePrice }) => `${comma(tradePrice)}`,
    },
    {
      id: 'growthRate',
      name: '전일대비',
      width: '20%',
      align: 'right',
      parser: ({ growthRate }) => {
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
      parser: ({ tradeFunds24H }) => `${comma(tradeFunds24H.split('.')[0])}원`,
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
            labels: price30D.map(({ date }: ProductOhlc) => date),
            datasets: [
              {
                fill: false,
                lineTension: 0.1,
                borderColor: gradient,
                pointRadius: 0,
                data: price30D.map(({ close }: ProductOhlc) => close),
              }
            ]
          };
        };
  
        return (
          <Div height='70px'>
            <Line
              data={data}
              options={CHART_OPTIONS}
            />
          </Div>
        );
      }
    }
  ]), [tempList, setTempList]);

  return(
    <Div>
      <TopMenu id='top_menu'>
        <TabsWrap>
          <TabsMenu isActive={menu === '전체'} onClick={e => setMenu(e.currentTarget.innerText)}>전체</TabsMenu>
          <TabsMenu isActive={menu === '즐겨찾기'} onClick={e => setMenu(e.currentTarget.innerText)}>즐겨찾기</TabsMenu>
        </TabsWrap>
        <SearchBox
          placeholder='상품명'
          onChange={e => setSearchText(e.currentTarget.value)}
          value={searchText}
          ref={searchBox}
        />
      </TopMenu>
      <BasicTable
        tableId='table'
        columnDefs={tableColumnDefs}
        rowData={filterList}
        uniqueKey={UNIQUE_KEY}
        selectMode
        selectContent={selectContent}
        onRowClick={handleRowClick}
      />
    </Div>
  );
};

export default ProductTable;
