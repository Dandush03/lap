import { GET_STORE_DATA } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_STORE_DATA:
      return action.payload.company;
    default:
      return state;
  }
};
