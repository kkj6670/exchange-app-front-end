import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Div, FlexContainer, Text } from 'styled/base';

export interface ColumnDefs<T> {
  width?: string;
  id: string;
  name: string;
  align?: string;
  parser?: (props: T) => {};
  onClick?: Function;
};

interface BasicTable<T> {
  tableId?: string;
  columnDefs: ColumnDefs<T>[];
  rowData?: T[];
  uniqueKey: string;
  rowClick?: Function;
  selectMode?: boolean;
  selectContent?: Element;
};

const TableWrap = styled(Div)`
  width: 100%;
  height: 100%;
  font-weight: bold;
  color: ${props => props.theme.color};
`;

const THead = styled(FlexContainer)`
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.theme.tableHeaderBg};
`;

const Row = styled(FlexContainer)`
  height: 80px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.tableBorderColor};
  cursor: pointer;
`;

const Col = styled(Text)`
  padding:0 20px;
`;

const TBody = styled(Div)`
  width: 100%;
  background-color: ${props => props.theme.tableBodyBg};
  > ${Row.selector} {
    :hover {
      background-color: ${props => props.theme.tableBorderColor };
    }
  }
`;

function BasicTable<T>({ tableId, columnDefs, rowData, uniqueKey, rowClick, selectMode }: BasicTable<T>) {
  
  const [seletedVal, selectVal] = useState<string>();

  const handleRowClick = useCallback( item => {
    if(selectMode) {
      if(seletedVal === item[uniqueKey]) selectVal('');
      else selectVal(item[uniqueKey]);
    }
    if(rowClick) rowClick(item);
  }, [rowClick, selectMode, seletedVal, selectVal, uniqueKey]);

  const THeadList = useMemo( () => {
    return columnDefs.map(item => (
      <Col
        key={`THead-${item.id}`}
        width={item.width}
        align={item.align || 'center'}
      >
        {item.name}
      </Col>
    ));
  }, [columnDefs]);

  const TBodyList = useMemo( () => {
    if(!rowData) return;
    return rowData.map( (rowItem: any) => (
      <Row key={`TBody-${rowItem[uniqueKey]}`} onClick={() => handleRowClick(rowItem)}>
        {columnDefs.map( ({ id, width, align, parser }) => (
          <Col
            key={`TBody-Col-${id}`}
            width={width}
            align={align}
          >
            {parser ? parser(rowItem) : rowItem[id]}
          </Col>
        ))}
      </Row>
    ));
  }, [columnDefs, rowData, handleRowClick, uniqueKey]);

  return (
    <TableWrap id={tableId}>
      <THead id={tableId+'_head'}>
        {THeadList}
      </THead>
      <TBody id={tableId+'_body'}>
        {TBodyList}
      </TBody>
    </TableWrap>
  );
};

export default BasicTable;
