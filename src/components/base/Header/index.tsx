import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as LogoImage } from 'svg/apex_fulltext_logo.svg';
import { FlexContainer, Div, Text } from 'styled/base';


const HeaderWrap = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.headerBg};
  display: flex;
  align-items: center;
  border-bottom: 1px solid #0c0e0f;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const LogoWrap = styled.div`
  flex: 10;
  & {
    a {
      display: block;
      width: 130px;
      height: 40px;
      svg {
        width: 100%;
        height: 100%;
        color: ${props => props.theme.logoColor};
        fill: ${props => props.theme.logoColor};
      }
    }
  }
`;

const IconHoverAni = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

const TextHoverAni = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(0);
  }
`;

const NavWrap = styled.nav`
  flex: 80;
  display: flex;
  justify-content: center;
  > div {
    position:relative;
    margin-right: 1.2rem;
    :hover {
      > a {
        animation: ${IconHoverAni} .3s ease-in;
        transform: scale(1.1);
      }
      > div {
        animation: ${TextHoverAni} .2s ease-in;
        display: block;
        :after {
          display: block;
        }
      }
    }
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      border-radius: 7px;
      background-image: ${props => props.theme.menuBgGradient};
      text-align: center;
      > img {
        width: 75%;
        height: 75%;
        cursor: pointer;
      }
    }
    > div {
      display: none;
      width: 160%;
      height: 25px;
      line-height: 25px;
      border-radius: 15px;
      background-color: black;
      font-size: 0.9rem;
      position: absolute;
      bottom: -50%;
      left: -30%;
      cursor: pointer;
      :after {
        display: none;
        content: '';
        position: absolute;
        bottom: 100%;
        left: calc(50% - 0.4rem);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid black;
        border-right: 7px solid transparent;
        border-left: 7px solid transparent;
      }
    }
  }
`;

const SubNavWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  > a {
   font-size: 1rem;
   margin-left: 15px;
   :hover {
     color: #eee;
   }
  }
`;

function Header() {
  return (
    <HeaderWrap id='header'>
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
            <Link to='/'>
              <img src='img/icon_menu_wallet.png'/>
            </Link>
            <Text align='center'>자산현황</Text>
          </Div>
          <Div>
            <Link to='/'>
              <img src='img/icon_menu_deposit.png'/>
            </Link>
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
