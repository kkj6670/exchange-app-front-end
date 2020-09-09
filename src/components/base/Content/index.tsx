import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Div } from 'styled/base';

interface IContent {
  children: ReactNode;
};

const MainWrap = styled.main`
  width: 100%;
  padding: 100px 0;
`;

function Content({ children }: IContent) {
  
  return (
    <MainWrap>
      {children}
    </MainWrap>
  );
};

export default Content;
