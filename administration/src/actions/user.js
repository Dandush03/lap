import axios from 'axios';
import {
  FINISH_FETCHING,
  GET_CSRF_PROTECTION, GET_CSRF_PROTECTION_LOGGED_IN,
  GET_STORE_DATA,
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

const getStoreDataSuccessfuly = (json) => ({
  type: GET_STORE_DATA,
  payload: json,
});

const getStoreData = () => {
  const url = '/api/v1/admins';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then(({ data, status }) => {
        if (status === 200) dispatch(getStoreDataSuccessfuly(data));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

const logOutUser = (csrf) => {
  const url = '/api/v1/auth/admins/sign_out';
  const formData = new FormData();
  formData.append('authenticity_token', csrf);
  formData.append('_method', 'DELETE');
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

const getSignedUser = () => {
  const url = '/api/v1/auth/admins/sign_in';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then((response) => {
        const { status, data } = response;
        const action = {
          202: getCSRFProtectionLoggedIn(data),
          200: getCSRFProtection(data),
        };

        dispatch(action[status]
          ? action[status]
          : logOutUser());

        return status;
      })
      .then((status) => {
        if (status === 202) dispatch(getStoreData());
        return status;
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

const signInUser = (data) => {
  const url = '/api/v1/auth/admins/sign_in';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        if (response.status === 201) {
          dispatch(signInUserSuccessfuly(response.data));
        } else {
          dispatch(signInUserUnsuccessfuly(response.data));
        }
        return response.status;
      })
      .then((status) => {
        if (status === 201) dispatch(getStoreData());
        return status;
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

export {
  signInUser, getSignedUser, logOutUser,
};
