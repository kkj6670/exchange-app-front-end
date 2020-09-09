import React, { useMemo } from 'react';
import styled from 'styled-components';

const VisualWrap = styled.ul`
  width: 100%;
  height: 400px;
  text-align: center;
`;

interface VisualSlider {
  list: List[];
};

interface List {
  src: string;
  name: string;
};

function VisualSlider({ list }: VisualSlider) {

  const imgList = useMemo( () => {

  }, []);

  return(
    <VisualWrap>
    </VisualWrap>
  );
};

export default VisualSlider;
