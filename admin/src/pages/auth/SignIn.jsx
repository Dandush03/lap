import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedUser } from '../../actions/user';
import SignInForm from '../../components/SignInForm';
import getI18n from '../../actions/i18n';

const SignIn = ({ history }) => {
  const user = useSelector((state) => state.user);
  const CSRF = useSelector((state) => state.CSRF);
  const i18n = useSelector((state) => state.i18n);
  const [redirect, setRedirect] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!i18n) dispatch(getI18n());
    dispatch(getSignedUser());
  }, []);

  useEffect(() => {
    if (redirect && user.login) {
      if (history.length > 1) history.goBack();
      if (history.length <= 2) history.replace('/');
    } else if (user.login) {
      dispatch(getSignedUser());
      setRedirect(true);
    }
  }, [user.login, redirect]);

  return (
    <>
      <SignInForm CSRF={CSRF} />
    </>
  );
};

SignIn.propTypes = {
  history: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default SignIn;
