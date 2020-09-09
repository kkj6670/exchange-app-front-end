import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Div } from 'styled/base';

interface Content {
  children: ReactNode;
};

function Content({ children }: Content) {
  return (
    <Div as='main' padding='100px 0'>
      {children}
    </Div>
  );
};

export default Content;
