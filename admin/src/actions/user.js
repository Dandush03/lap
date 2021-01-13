import axios from 'axios';
// import { SIGN_IN_USER_SUCCESSFULY, SIGN_IN_USER_ERROR, SIGN_OUT_USER } from './actionsType';

// const signInUserSuccessfuly = (json) => ({
//   type: SIGN_IN_USER_SUCCESSFULY,
//   payload: json,
// });

// const signInUserUnsuccessfuly = (json) => ({
//   type: SIGN_IN_USER_ERROR,
//   payload: json,
// });

// const signOutUserSuccessfuly = (json) => ({
//   type: SIGN_OUT_USER,
//   payload: json,
// });

const signInUser = (data) => {
  const url = '/api/admin/auth/sign_in';
  return ((dispatch) => {
    console.log(dispatch);
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => console.log(response));
  });
};

const signOutUser = () => {

};

const getSignedUser = () => {
  const url = '/api/admin/auth/sign_in';
  return ((dispatch) => {
    console.log(dispatch);
    axios
      .get(url)
      .then((response) => console.log(response));
  });
};

export { signInUser, signOutUser, getSignedUser };
