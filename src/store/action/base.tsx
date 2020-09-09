import * as type from 'store/action/type/base';

export const changeTheme = (theme: string) => ({
  type: type.CHANGE_THEME,
  payload: {
    theme,
  }
});