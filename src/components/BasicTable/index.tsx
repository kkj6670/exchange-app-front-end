import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Div, FlexContainer, Text } from 'styled/base';

export interface ColumnDefs<T> {
  width?: string;
  id: string;
  name: string;
  align?: string;
  parser?: (props: T) => string | Element | ReactElement;
  onClick?: Function;
};

interface BasicTable<T> {
  tableId?: string;
  columnDefs: ColumnDefs<T>[];
  rowData?: T[];
  uniqueKey: string;
  onRowClick?: Function;
  selectMode?: boolean;
  selectContent?: ReactElement | Element;
};

const TableWrap = styled(Div)`
  width: 100%;
  height: 100%;
  font-weight: bold;
  color: ${props => props.theme.color};
`;

const THead = styled(FlexContainer)`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.theme.tableHeaderBg};
  z-index: 1;
`;

interface Row {
  isActive: boolean;
};

const Row = styled(FlexContainer)<Row>`
  height: 80px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.tableBorderColor};
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.tableBorderColor };
  }
  background-color: ${props => props.isActive ? props.theme.tableBorderColor : 'transparent'};
`;

const RowContent = styled(FlexContainer)`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.tableBorderColor};
`;

const Col = styled(Text)`
  padding:0 20px;
`;

const TBody = styled(Div)`
  width: 100%;
  background-color: ${props => props.theme.tableBodyBg};
`;

function BasicTable<T>({ tableId, columnDefs, rowData, uniqueKey, onRowClick, selectMode, selectContent }: BasicTable<T>) {
  
  const [seletedVal, selectVal] = useState<string>();

  const handleRowClick = useCallback( async (item) => {
    if(onRowClick) {
      const errCheck = await onRowClick(item);
      if(errCheck) return;
    }

    if(selectMode) {
      if(seletedVal === item[uniqueKey]) selectVal('');
      else selectVal(item[uniqueKey]);
    }
  }, [onRowClick, selectMode, seletedVal, selectVal, uniqueKey]);

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
    // any를 안쓸방법
    // parser(rowItem) 와 같이 사용할수 있는 방법
    return rowData.map( (rowItem: any) => (
      <Div key={`TBody-${rowItem[uniqueKey]}`}>
        <Row 
          isActive={seletedVal === rowItem[uniqueKey]}
          onClick={() => handleRowClick(rowItem)}
        >
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
        {(selectContent && seletedVal === rowItem[uniqueKey]) && (
          <RowContent key={`TBody-RowContent-${rowItem[uniqueKey]}`}>{selectContent}</RowContent>
        )}
      </Div>
    ));
  }, [seletedVal, columnDefs, rowData, handleRowClick, uniqueKey, selectContent]);

  return (
    <TableWrap id={tableId}>
      <THead id={`${tableId}_head`}>
        {THeadList}
      </THead>
      <TBody id={`${tableId}_body`}>
        {TBodyList}
      </TBody>
    </TableWrap>
  );
};

export default BasicTable;
