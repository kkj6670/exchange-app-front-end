import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

import { comma } from 'lib/utils';
import { ProductOhlc, ProductList } from 'lib/api';
import useApi from 'lib/hook/useApi';

import { Div, Text, FlexContainer, FlexItems, ColorList } from 'styled/base';
import BasicTable, { ColumnDefs } from 'components/BasicTable';
import ProductChart from './ProductChart';

import { ReactComponent as FavoriteImg } from 'svg/icon_favorite.svg';

const TopMenu = styled(FlexContainer)`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: ${(props) => props.theme.tableHeaderBg};
  border-bottom: 1px solid ${(props) => props.theme.tableBorderColor};
  z-index: 1;
`;

const TabsWrap = styled(FlexItems)`
  display: flex;
  flex: 80;
  height: 100%;
`;

interface TabsMenu {
  isActive?: boolean;
}

const TabsMenu = styled.button<TabsMenu>`
  width: 90px;
  height: 100%;
  background-color: transparent;
  color: ${(props) => props.theme.color};
  font-weight: bold;
  border-bottom: 3px solid transparent;
  ${(props) =>
    props.isActive
      ? `
    color: ${ColorList.yellow01};
    border-color: ${ColorList.yellow01};
  `
      : null}
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
  border: 1px solid ${(props) => props.theme.tableBorderColor};
  color: ${(props) => props.theme.color};
  padding: 5px 8px;
  border-radius: 8px;
`;

const UNIQUE_KEY = 'market';

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
    yAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const handleFixedTable = (fixedScrollTop: number, headerHeight: number) => {
  const topMenu = document.getElementById('top_menu');
  const tableHeader = document.getElementById('table_head');
  const tableBody = document.getElementById('table_body');
  const scrollTop = document.scrollingElement?.scrollTop || 0;

  if (!topMenu || !tableHeader || !tableBody) return;

  if (fixedScrollTop <= scrollTop) {
    topMenu.style.setProperty('position', 'fixed');
    topMenu.style.setProperty('top', `${headerHeight}px`);
    topMenu.style.setProperty('width', `90%`);

    tableHeader.style.setProperty('position', 'fixed');
    tableHeader.style.setProperty('width', '90%');
    tableHeader.style.setProperty('top', `${headerHeight + (topMenu.offsetHeight || 0)}px`);

    tableBody.style.setProperty(
      'margin-top',
      `${(topMenu.offsetHeight || 0) + (tableHeader.offsetHeight || 0)}px`,
    );
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
}

function ProductTable({ list, productRequest = () => {} }: ProductTable) {
  const searchBox = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [menu, setMenu] = useState<string>('전체');
  const [selectedProduct, selectProduct] = useState<string>('');

  // 즐겨찾기 저장용
  // 실제 데이터 연동시 api호출해 저장후 새로 불러오는 방식으로 할지?
  // 지금 방식보다 나은 방식이 있을지?
  const [tempList, setTempList] = useState<ProductList[]>([]);
  const [filterList, setFilterList] = useState<ProductList[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const [chartData, setChartData] = useState<ProductOhlc[]>([]);

  useEffect(() => {
    const tempList = list || [];
    setTempList(tempList);
  }, [list]);

  useEffect(() => {
    if (!tempList) return;
    const lowerText = searchText.toLowerCase();
    const favorite = menu === '즐겨찾기' ? true : false;
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '[]');
    const nextList = tempList.filter(({ korean_name, market, english_name }) => {
      const lowerMarketName = market.toLowerCase();
      const lowerEnName = english_name.toLowerCase();
      let check = true;

      if (
        !korean_name.includes(lowerText) &&
        !lowerMarketName.includes(lowerText) &&
        !lowerEnName.includes(lowerText)
      )
        check = false;

      if (favorite && !favoriteList.includes(market)) check = false;

      return check;
    });
    setFilterList(nextList);
  }, [tempList, searchText, menu]);

  useEffect(() => {
    const topMenu = document.getElementById('top_menu');
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    const fixedScrollTop = (topMenu?.offsetTop || 0) - headerHeight || 0;
    const handleScrollEvent = () => handleFixedTable(fixedScrollTop, headerHeight);

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleDateClick = useCallback(
    (selectDate) => {
      let dateType = '1D';
      if (selectDate === '1D' || selectDate === '1W') dateType = '1H';

      // setChartData
    },
    [setChartData, selectedProduct],
  );

  const handleRowClick = useCallback(
    (item: ProductList) => {
      const { market } = item;
      selectProduct(market);
      if (list) {
        const targetData = list.filter((product) => product.market === market)[0]?.price30D || [];
        setChartData(targetData);
      }
    },
    [selectProduct, setChartData, list],
  );

  const selectContent = useMemo(() => {
    return <ProductChart data={chartData} onDateClick={handleDateClick} />;
  }, [chartData, handleDateClick]);

  const handleFavoriteClick = (e: React.MouseEvent, market: string) => {
    e.stopPropagation();

    const target = e.currentTarget;
    const isActive = target.getAttribute('data-active') === 'true';
    target.setAttribute('opacity', `${isActive ? '0.3' : '1'}`);

    const favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '[]');

    if (isActive) {
      const idx = favoriteList.indexOf(market);
      favoriteList.splice(idx, 1);
    } else {
      favoriteList.push(market);
    }

    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    setTempList([...tempList]);
  };

  const tableColumnDefs: ColumnDefs<ProductList>[] = useMemo(
    () => [
      {
        id: 'market',
        name: '상품명',
        width: '20%',
        align: 'left',
        parser: ({ korean_name, market, english_name }) => {
          const favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '[]') || [];
          const isFavorite = favoriteList.includes(market);

          return (
            <FlexContainer alignItems='center'>
              <FlexItems flex='10'>
                <FavoriteImg
                  className='product-favorite'
                  fill={ColorList.yellow01}
                  opacity={!isFavorite ? '0.3' : '1'}
                  data-active={isFavorite}
                  width='15px'
                  height='15px'
                  onClick={(e) => handleFavoriteClick(e, market)}
                />
              </FlexItems>
              <FlexItems flex='20'>
                <Div
                  as='img'
                  width='30px'
                  src={`https://static.upbit.com/logos/${market?.replace('KRW-', '')}.png`}
                />
              </FlexItems>
              <FlexItems flex='70'>
                <Text>{`${korean_name}(${english_name})`}</Text>
                <Text weight='normal'>{market}</Text>
              </FlexItems>
            </FlexContainer>
          );
        },
      },
      {
        id: 'trade_price',
        name: '가격',
        width: '20%',
        align: 'right',
        parser: ({ trade_price }) => `${comma(trade_price)}`,
      },
      {
        id: 'change_rate',
        name: '전일대비',
        width: '20%',
        align: 'right',
        parser: ({ change_rate }) => {
          const rate = change_rate;
          const textColor = rate < 0 ? ColorList.blue01 : ColorList.red01;
          return <Text color={textColor}>{rate < 0 ? rate : `+${rate}`}%</Text>;
        },
      },
      {
        id: 'tradeFunds24H',
        name: '거래대금',
        width: '20%',
        align: 'right',
        parser: ({ tradeFunds24H }) => `${comma(tradeFunds24H)}원`,
      },
      {
        id: 'priceGraph',
        name: '30일 동향',
        width: '20%',
        align: 'right',
        parser: ({ price30D }: ProductList) => {
          const data = (canvas: HTMLCanvasElement) => {
            const ctx = canvas.getContext('2d');
            const gradient = ctx?.createLinearGradient(0, 0, canvas.width - 100, 0);

            gradient?.addColorStop(0, ColorList.yellow01);
            gradient?.addColorStop(1, ColorList.yellow02);

            return {
              labels: price30D.map(({ timestamp }: ProductOhlc) => timestamp),
              datasets: [
                {
                  fill: false,
                  lineTension: 0.1,
                  borderColor: gradient,
                  pointRadius: 0,
                  data: price30D.map(({ trade_price }: ProductOhlc) => trade_price),
                },
              ],
            };
          };

          return (
            <Div height='70px'>
              <Line data={data} options={CHART_OPTIONS} />
            </Div>
          );
        },
      },
    ],
    [tempList, setTempList],
  );

  const handleSearchText = useCallback(
    (e) => {
      const { value } = e.currentTarget;

      setSearchText(value);
    },
    [setSearchText],
  );

  const handleMenu = useCallback(
    (e) => {
      const { innerText } = e.currentTarget;

      setMenu(innerText);
    },
    [setMenu],
  );

  return (
    <Div>
      <TopMenu id='top_menu'>
        <TabsWrap>
          <TabsMenu isActive={menu === '전체'} onClick={handleMenu}>
            전체
          </TabsMenu>
          <TabsMenu isActive={menu === '즐겨찾기'} onClick={handleMenu}>
            즐겨찾기
          </TabsMenu>
        </TabsWrap>
        <SearchBox
          placeholder='상품명'
          onChange={handleSearchText}
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
}

export default ProductTable;
