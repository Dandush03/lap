import { CREATE_ARTICLE, GET_STORE_DATA } from 'actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_STORE_DATA:
      return action.payload.articles;
    case CREATE_ARTICLE:
      return [action.payload, ...state];
    default:
      return state;
  }
};
