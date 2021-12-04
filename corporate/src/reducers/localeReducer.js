/* eslint-disable camelcase */
import { GET_LOCALE } from 'actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_LOCALE: {
      const { payload } = action;
      return payload;
    }
    default:
      return state;
  }
};
