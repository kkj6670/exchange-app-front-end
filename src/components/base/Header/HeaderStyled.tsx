import styled, { keyframes } from 'styled-components';

export const HeaderWrap = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.headerBg};
  display: flex;
  align-items: center;
  border-bottom: 1px solid #0c0e0f;
  position: fixed;
  top: 0;
`;

export const LogoWrap = styled.div`
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

export const IconHoverAni = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

export const TextHoverAni = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(0);
  }
`;

export const NavWrap = styled.nav`
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
      display: block;
      width: 55px;
      height: 55px;
      border-radius: 7px;
      background-image: ${props => props.theme.menuBgGradient};
      text-align: center;
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

export const SubNavWrap = styled.div`
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