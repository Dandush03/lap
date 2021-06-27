/* eslint-disable camelcase */
import {
  GET_CSRF_PROTECTION, GET_CSRF_PROTECTION_LOGGED_IN, RENEW_CSRF_PROTECTION,
} from 'actions/actionsType';

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
    case RENEW_CSRF_PROTECTION:
      return { ...state, authToken: action.payload };
    default:
      return state;
  }
};
