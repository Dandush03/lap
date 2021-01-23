import { GET_STORE_DATA, GET_TAXES } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_STORE_DATA:
      return action.payload.taxes;
    case GET_TAXES:
      return [...action.payload];
    default:
      return state;
  }
};
