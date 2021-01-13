import axios from 'axios';
import {
  GET_CSRF_PROTECTION, GET_CSRF_PROTECTION_LOGGED_IN,
  SIGN_IN_USER_ERROR, SIGN_IN_USER_SUCCESSFULY,
} from './actionsType';

const getCSRFProtection = (json) => ({
  type: GET_CSRF_PROTECTION,
  payload: json,
});

const getCSRFProtectionLoggedIn = (json) => ({
  type: GET_CSRF_PROTECTION_LOGGED_IN,
  payload: json,
});

const signInUserSuccessfuly = (json) => ({
  type: SIGN_IN_USER_SUCCESSFULY,
  payload: json,
});

const signInUserUnsuccessfuly = (json) => ({
  type: SIGN_IN_USER_ERROR,
  payload: json,
});

// const signOutUserSuccessfuly = (json) => ({
//   type: SIGN_OUT_USER,
//   payload: json,
// });

const signInUser = (data) => {
  const url = '/api/admin/auth/admins/sign_in';
  return ((dispatch) => {
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        if (response.status === 201) return dispatch(signInUserSuccessfuly(response.data));
        return dispatch(signInUserUnsuccessfuly(response.data));
      });
  });
};

const signOutUser = () => {

};

const getSignedUser = () => {
  const url = '/api/admin/auth/admins/sign_in';
  return ((dispatch) => {
    axios
      .get(url)
      .then((response) => {
        if (response.status === 202) return dispatch(getCSRFProtectionLoggedIn(response.data));
        return dispatch(getCSRFProtection(response.data));
      });
  });
};

export { signInUser, signOutUser, getSignedUser };
