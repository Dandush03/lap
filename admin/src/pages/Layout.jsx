import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Menu from '../containers/Menu';
import getI18n from '../actions/i18n';
import { getSignedUser } from '../actions/user';
import NewArticle from './articles/NewArticle';
import useStyles from '../styles/layout';

const Layout = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const CSRF = useSelector((state) => state.CSRF);
  const classes = useStyles();
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

  if (!user.login || !i18n) {
    return (
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className={classes.root}>
      <Menu menu={i18n.side_menu} locale={match.params.locale} />
      <main className={classes.main}>
        <Switch>
          <Route path="/:locale/articles/new" exact component={NewArticle} />
        </Switch>
      </main>
    </div>
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
