import { DefaultTheme } from 'styled-components'

export const DarkTheme: DefaultTheme = {
  name: 'dark',
  headerBg: '#0c0e0f',
  bgColor: '#21262b',
  color: '#bcbcbc',
  activeColor: '#eee',
  logoColor: '#fff',
  menuBgGradient: 'linear-gradient(to right bottom, #202527 0%, #0f1112 100%)',
  tableHeaderBg: '#0d0f10',
  tableBodyBg: '#1f2326',
  tableBorderColor: '#282c2f',
};

export const WhiteTheme: DefaultTheme = {
  name: 'white',
  headerBg: '#fff',
  bgColor: '#fff',
  color: '#202529',
  activeColor: '#aaa',
  logoColor: '#000',
  menuBgGradient: 'linear-gradient(315deg, #2d3436 0%, #000000 74%)',
  tableHeaderBg: '#f9f9f9',
  tableBodyBg: '#fff',
  tableBorderColor: '#282c2f',
};