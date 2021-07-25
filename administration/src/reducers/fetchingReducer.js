import {
  FINISH_FETCHING,
  START_FETCHING,
  SIGN_IN_USER_ERROR,
} from 'actions/actionsType';

export default (state = 0, action) => {
  switch (action.type) {
    case START_FETCHING: {
      const newState = state + 1;
      return newState;
    }
    case FINISH_FETCHING: {
      const newState = state > 0 ? state - 1 : 0;
      return newState;
    }
    case SIGN_IN_USER_ERROR: {
      return 0;
    }
    default:
      return state;
  }
};
