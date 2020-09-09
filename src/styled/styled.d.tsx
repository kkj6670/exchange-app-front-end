import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    headerBg: string;
    bgColor: string;
    color: string;
    logoColor: string;
    menuBgGradient: string;
    tableHeaderBg: string;
    tableBodyBg: string;
    tableBorderColor: string;
  }
}