import { SIGN_IN_USER_SUCCESSFULY, SIGN_OUT_USER } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case SIGN_IN_USER_SUCCESSFULY:
      return { login: true };
    case SIGN_OUT_USER:
      return { login: false };
    default:
      return state;
  }
};
