import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Menu from '../containers/Menu';
import getI18n from '../actions/i18n';
import { getSignedUser } from '../actions/user';
import NewArticle from './articles/NewArticle';

const Layout = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const CSRF = useSelector((state) => state.CSRF);
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.set('locale', match.params.locale);
    if (!i18n) dispatch(getI18n());
  }, []);

  useEffect(async () => {
    if (CSRF.authToken && !user.login) history.push('/auth/sign_in?redirected=true');
    if (!user.login && !CSRF.authToken) {
      dispatch(getSignedUser());
    }
  }, [CSRF]);

  if (!user.login) return null;

  return (
    <>
      <Menu menu={i18n.side_menu} locale={match.params.locale} />
      <Switch>
        <Route path="/:locale/articles/new" exact component={NewArticle} />
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
