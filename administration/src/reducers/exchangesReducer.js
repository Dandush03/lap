import { CREATE_EXCHANGE, GET_STORE_DATA } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_STORE_DATA:
      return action.payload.exchanges;
    case CREATE_EXCHANGE:
      return [action.payload, ...state];
    default:
      return state;
  }
};
