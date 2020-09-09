import { Middleware } from "redux";
const loggerMiddleware: Middleware = store => next => action => {

  console.log(`현재상태 : ${store.getState()} 액션 : ${action}`);

  const result = next(action);

  console.log(`다음상태 : ${store.getState()} 액션 : ${action}`);
  
  return result;
}

export default loggerMiddleware;
