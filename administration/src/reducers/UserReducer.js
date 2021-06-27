import { GET_CSRF_PROTECTION_LOGGED_IN, SIGN_IN_USER_SUCCESSFULY } from 'actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_CSRF_PROTECTION_LOGGED_IN: {
      const { payload: { user } } = action;
      return { ...user, login: true };
    }
    case SIGN_IN_USER_SUCCESSFULY: {
      const { payload: user } = action;
      return { ...user, login: true };
    }
    default:
      return state;
  }
};
