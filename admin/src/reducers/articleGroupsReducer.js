import { GET_ARTICLES_GROUPS } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_ARTICLES_GROUPS:
      return [...action.payload];
    default:
      return state;
  }
};
