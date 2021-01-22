import { FINISH_FETCHING, START_FETCHING } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case START_FETCHING: {
      const newState = state + 1;
      return newState;
    }
    case FINISH_FETCHING: {
      const newState = state > 0 ? state - 1 : 0;
      return newState;
    }
    default:
      return state;
  }
};
