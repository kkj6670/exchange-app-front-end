import { combineReducers } from 'redux';
import base from './base';

const reducers = combineReducers({
  base,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>
