import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 none;
  }
  html,
  body {
    height: 100%;
  }
  body {
    font-family: 'Nanum Gothic', sans-serif, arial;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.color};
  }
  ol, ul {
    list-style: none;
  }
  label, input, button, select, img {
    vertical-align: middle;
  }
  a:link, a:visited {
    color: ${props => props.theme.color};
    text-decoration: none;
    cursor: pointer;
  }
  a:hover, a:focus {
    font-weight: bold;
  }
  button {
    cursor: pointer;
    outline: none;
  }
  .hidden{
    position:absolute;
    overflow:hidden;
    border:0;
    width:1px;
    height:1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path:inset(50%);
  }
`;

export default GlobalStyle;
