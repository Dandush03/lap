import { CREATE_ARTICLE } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return [action.payload, ...state];
    default:
      return state;
  }
};
