import { CHANGE_THEME } from 'store/action/type/base';

export interface BaseState {
  theme?: string
};

interface ActionProps {
  type: string;
  payload: BaseState
};

const initalState = {
  theme: 'dark'
};

const base = (state: BaseState = initalState, action: ActionProps) => {
  switch(action.type){
    case CHANGE_THEME: {
      const theme = action.payload.theme;
      const nextState = {
        ...state,
        theme,
      }
      return nextState;
    }
    default: {
      return state;
    }
  }
};

export default base;
