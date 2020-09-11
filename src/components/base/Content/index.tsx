import React, { ReactNode } from 'react';

import { Div } from 'styled/base';

interface Content {
  children: ReactNode;
};

function Content({ children }: Content) {
  return (
    <Div id='content' as='main' padding='80px 0'>
      {children}
    </Div>
  );
};

export default Content;
