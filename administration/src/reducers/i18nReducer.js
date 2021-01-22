/* eslint-disable camelcase */
import { GET_I18N } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_I18N: {
      const { payload: { i18n } } = action;
      return { ...i18n };
    }
    default:
      return state;
  }
};
