import axios from 'axios';
import {
  FINISH_FETCHING,
  GET_CSRF_PROTECTION, GET_CSRF_PROTECTION_LOGGED_IN,
  SIGN_IN_USER_ERROR, SIGN_IN_USER_SUCCESSFULY, SIGN_OUT_USER, START_FETCHING,
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

const signOutUserSuccessfuly = () => ({
  type: SIGN_OUT_USER,
});

const getSignedUser = () => {
  const url = '/api/admin/auth/admins/sign_in';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then((response) => {
        if (response.status === 202) return dispatch(getCSRFProtectionLoggedIn(response.data));
        return dispatch(getCSRFProtection(response.data));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

const signInUser = (data) => {
  const url = '/api/admin/auth/admins/sign_in';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        if (response.status === 201) return dispatch(signInUserSuccessfuly(response.data));
        return dispatch(signInUserUnsuccessfuly(response.data));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

const logOutUser = (csrf) => {
  const url = '/api/admin/auth/admins/sign_out';
  const formData = new FormData();
  formData.append('authenticity_token', csrf);
  formData.append('_method', 'delete');
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, formData, { withCredentials: true })
      .then(() => {
        dispatch(signOutUserSuccessfuly());
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

export {
  signInUser, getSignedUser, logOutUser,
};
