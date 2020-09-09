import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'store/reducer';
import loggerMiddleware from 'lib/loggerMiddleware';

// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 타입스크립트 적용
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configure = () => {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devTools || compose;
  
  const middlewares = [
      loggerMiddleware,
  ];

  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

  return store;
}

export default configure;
