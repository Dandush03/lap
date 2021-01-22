import { GET_ARTICLES_GROUPS, CREATE_ARTICLES_GROUP } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_ARTICLES_GROUPS:
      return [...action.payload];
    case CREATE_ARTICLES_GROUP:
      return [action.payload, ...state];
    default:
      return state;
  }
};
