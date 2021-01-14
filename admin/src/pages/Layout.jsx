import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Menu from '../containers/Menu';
import getI18n from '../actions/i18n';
import { getSignedUser } from '../actions/user';
import SignIn from './auth/SignIn';

const Layout = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.set('locale', match.params.locale);
    if (!i18n) dispatch(getI18n());
  }, []);

  useEffect(async () => {
    if (redirect && !user.login) history.push('/auth/sign_in?redirected=true');
    if (!user.login) {
      if (!redirect) dispatch(getSignedUser());
      setRedirect(true);
    }
  }, [redirect]);

  if (!user.login) return null;

  return (
    <>
      <Menu menu={i18n.side_menu} locale={match.params.locale} />
      <Switch>
        <Route path="/:locale/article" exact component={SignIn} />
      </Switch>
    </>
  );
};

Layout.propTypes = {
  history: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default Layout;
