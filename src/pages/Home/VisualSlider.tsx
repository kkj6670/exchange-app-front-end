import React, { useEffect, useMemo, useState,  } from 'react';
import styled from 'styled-components';

import { Div, FlexContainer } from 'styled/base';

interface ListBox {
  count: number;
  selectedIdx: number;
};

interface SelectedBtn {
  selected: boolean;
};

const SliderWrap = styled(Div)`
  width: 100%;
  height: 380px;
  margin-bottom: 25px;
  overflow: hidden;
  position: relative;
  > div {
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    justify-content: center;
    align-items: center;
  }
`;

const ListBox = styled.ul<ListBox>`
  width: ${props => props.count*100}%;
  height: 100%;
  transition-duration: 500ms;
  transform: translateX(-${props => props.selectedIdx * 100 / props.count}%);
  display: flex;
  > li {
    width: calc( 100% / ${props => props.count});
    height: 100%;
    background-size: cover;
  }
`;

const SelectBtn = styled.button<SelectedBtn>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.selected ? '#6d717a' : '#ccc'};
  margin-right: 10px;
  font-size: 0;
  :last-child {
    margin-right: 0;
  }
  :hover {
    background-color: #6d717a;
  }
`;

interface VisualSlider {
  list?: List[];
};

interface List {
  src: string;
  name: string;
};

function VisualSlider({ list = [] }: VisualSlider) {

  const [selectedItem, selectItem] = useState<number>(0);

  const sliderList = useMemo( () => list.map( (item) => (
    <Div as='li' background={`url("${item.src}") no-repeat`} key={item.src}>
      <span className='hidden'>{item.name} 이미지</span>
    </Div>
  )), [list]);

  const btnList = useMemo( () => list.map((item, index) => (
    <SelectBtn selected={selectedItem === index} key={item.src} onClick={() => selectItem(index)}>
      <span className='hidden'>{item.name} 이미지 바로가기 버튼</span>
    </SelectBtn>
  )), [list, selectedItem, selectItem]);

  useEffect( () => {
    const imgLen = list.length;
    if(imgLen === 0) return;
    const timer = setTimeout( () => {
      selectItem(selectedItem === imgLen - 1 ? 0 : selectedItem + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [list, selectedItem, selectItem]);

  return (
    <SliderWrap>
      <ListBox count={list.length} selectedIdx={selectedItem}>
        {sliderList}
      </ListBox>
      <FlexContainer>
        {btnList}
      </FlexContainer>
    </SliderWrap>
  );
};

export default VisualSlider;
