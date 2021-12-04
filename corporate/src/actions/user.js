/* eslint-disable no-debugger */
import axios from 'axios';
import {
  FINISH_FETCHING,
  FORCE_RESET,
  GET_CSRF_PROTECTION,
  GET_CSRF_PROTECTION_LOGGED_IN,
  GET_STORE_DATA,
  SIGN_IN_USER_ERROR,
  SIGN_IN_USER_SUCCESSFULY,
  SIGN_OUT_USER,
  START_FETCHING,
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

const signOutUserSuccessfuly = (json) => ({
  type: SIGN_OUT_USER,
  payload: json,
});

const getStoreDataSuccessfuly = (json) => ({
  type: GET_STORE_DATA,
  payload: json,
});

const getStoreData = () => {
  const url = '/api/v1/corporate';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then(({ data, status }) => {
        if (status === 200) return dispatch(getStoreDataSuccessfuly(data));
        return dispatch(dispatch(signOutUserSuccessfuly()));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }))
      .catch(() => dispatch({ type: SIGN_OUT_USER }));
  });
};

const logOutUser = (csrf) => {
  const url = '/api/v1/auth/sign_out';
  const formData = new FormData();
  formData.append('authenticity_token', csrf);
  formData.append('_method', 'DELETE');
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, formData, { withCredentials: true })
      .then((response) => {
        dispatch(signOutUserSuccessfuly(response.data));
      })
      .catch((error) => {
        if (error?.response?.status === 302) {
          return dispatch(signOutUserSuccessfuly(error.response.data));
        }
        return dispatch({ type: FORCE_RESET });
      });
  });
};

const getSignedUser = () => {
  const url = '/api/v1/auth/sign_in';
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
      .then(() => dispatch({ type: FINISH_FETCHING }))
      .catch(() => dispatch({ type: FORCE_RESET }));
  });
};

const signInUser = (data) => {
  const url = '/api/v1/auth/sign_in';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        debugger;
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
      .then(() => dispatch({ type: FINISH_FETCHING }))
      .catch((error) => {
        if (error.response.status === 401) {
          return dispatch(signInUserUnsuccessfuly(error.response.data));
        }
        return dispatch({ type: FORCE_RESET });
      });
  });
};

export {
  signInUser, getSignedUser, logOutUser,
};
