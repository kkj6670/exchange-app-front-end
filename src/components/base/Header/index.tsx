import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoImage } from 'svg/apex_fulltext_logo.svg';
import { FlexContainer, Div, Text } from 'styled/base';

import { HeaderWrap, LogoWrap, NavWrap, SubNavWrap } from './HeaderStyled';

function Header() {
  return (
    <HeaderWrap>
      <FlexContainer width='90%' height='100%' margin='0 auto' alignItems='center'>
        <LogoWrap>
          <Link to='/'><LogoImage /></Link>
        </LogoWrap>
        <NavWrap>
          <Div>
            <Link to='/'></Link>
            <Text align='center'>거래소</Text>
          </Div>
          <Div>
            <Link to='/'></Link>
            <Text align='center'>자산현황</Text>
          </Div>
          <Div>
            <Link to='/'></Link>
            <Text align='center'>입출금</Text>
          </Div>
          <Div>
            <Link to='/'></Link>
            <Text align='center'>고객센터</Text>
          </Div>
        </NavWrap>
        <SubNavWrap>
          <Link to='/'>로그인</Link>
          <Link to='/'>회원가입</Link>
        </SubNavWrap>
      </FlexContainer>
    </HeaderWrap>
  );
};

export default Header;
