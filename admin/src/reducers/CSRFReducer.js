/* eslint-disable camelcase */
import { GET_CSRF_PROTECTION, GET_CSRF_PROTECTION_LOGGED_IN } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_CSRF_PROTECTION: {
      const { payload: { csrf: { authToken, resource_name } } } = action;
      return { authToken, resource: resource_name }; }
    case GET_CSRF_PROTECTION_LOGGED_IN: {
      const { payload: { csrf: { authToken, resource_name } } } = action;
      return {
        authToken,
        resource: resource_name,
      }; }
    default:
      return state;
  }
};
