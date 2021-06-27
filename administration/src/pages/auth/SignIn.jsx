import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import getI18n from 'actions/i18n';
import getLocale from 'actions/locale';
import { getSignedUser } from 'actions/user';

// Component
import Loading from 'shared-components/Loading';
import SignInForm from './components/SignInForm';

const SignIn = ({ history }) => {
  const user = useSelector((state) => state.user);
  const fetching = useSelector((state) => state.fetching);
  const i18n = useSelector((state) => state.i18n);
  const CSRF = useSelector((state) => state.CSRF);
  const [redirect, setRedirect] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!CSRF.authToken) {
      dispatch(getSignedUser());
      dispatch(getI18n());
      dispatch(getLocale());
    }
  }, []);

  useEffect(() => {
    if (redirect && user.login) {
      if (history.length > 1) history.goBack();
      if (history.length <= 2) history.replace('/');
    } else if (user.login) {
      setRedirect(true);
    }
  }, [user.login, redirect]);

  if (!CSRF || !i18n || fetching) return (<Loading />);

  return (
    <>
      <SignInForm CSRF={CSRF} i18n={i18n?.sign_in} />
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
