/* eslint-disable camelcase */
import { TOAST_MESSAGE, SIGN_IN_USER_ERROR } from 'actions/actionsType';

export default (_, action) => {
  switch (action.type) {
    case TOAST_MESSAGE: {
      const { payload } = action;
      return payload;
    }
    case SIGN_IN_USER_ERROR: {
      const { payload: message } = action;
      return { ...message, type: 'error' };
    }
    default:
      return { message: '', type: null };
  }
};
