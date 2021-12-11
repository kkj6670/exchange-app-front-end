import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GlobalStyle from 'styled/globalStyle';
import { DarkTheme, WhiteTheme } from 'styled/theme';
import Header from 'components/base/Header';
import Content from 'components/base/Content';

import Home from 'pages/Home';
import Wallet from 'pages/Wallet';
import DW from 'pages/DW';

import { RootState } from 'store/reducer';

const setTheme = (theme: string) => {
  let themeObj = DarkTheme;
  if(theme === 'drak') themeObj = DarkTheme;
  if(theme === 'white') themeObj = WhiteTheme;
  return themeObj;
};

function App() {
  const theme = useSelector( (state: RootState) => state.base.theme || '' );
  console.log(process.env.PUBLIC_URL);
  return (
    <ThemeProvider theme={setTheme(theme)}>
      <GlobalStyle />
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Content>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/wallet' component={Wallet} />
            <Route exact path='/dw' component={DW} />
          </Switch>
        </Content>
      </Router>
    </ThemeProvider>
  );
}

export default App;
