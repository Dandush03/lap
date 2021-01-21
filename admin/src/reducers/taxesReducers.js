import { GET_TAXES } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_TAXES:
      return [...action.payload];
    default:
      return state;
  }
};
