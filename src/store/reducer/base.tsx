import { CHANGE_THEME } from 'store/action/type/base';

export interface IBaseState {
  theme?: string
};

interface IActionProps {
  type: string;
  payload: IBaseState
};

const initalState = {
  theme: 'dark'
};

const base = (state: IBaseState = initalState, action: IActionProps) => {
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
