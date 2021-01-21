import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  Backdrop, CircularProgress, createMuiTheme, jssPreset, StylesProvider, ThemeProvider,
} from '@material-ui/core';
import * as locales from '@material-ui/core/locale';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Menu from '../containers/Menu';
import getI18n from '../actions/i18n';
import { getSignedUser } from '../actions/user';
import NewArticle from './articles/NewArticle';
import useStyles from '../styles/layout';
import NewClient from './clients/NewClient';

const Layout = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const CSRF = useSelector((state) => state.CSRF);
  const classes = useStyles();
  const dispatch = useDispatch();

  const lang = {
    he: ['heIL', 'rtl'],
    en: ['enUS', 'ltr'],
    es: ['esES', 'ltr'],
  };

  useEffect(() => {
    dispatch(getSignedUser());
    Cookies.set('locale', match.params.locale);
    if (!i18n) dispatch(getI18n());
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('dir', lang[match.params.locale][1]);
  }, []);

  useEffect(async () => {
    if (CSRF.authToken && !user.login) history.push('/auth/sign_in?redirected=true');
    if (!CSRF.authToken) dispatch(getSignedUser());
  }, [CSRF]);

  if (!user.login || !i18n) {
    return (
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const theme = createMuiTheme(
    {
      direction: lang[match.params.locale][1],
      locales: locales[lang[match.params.locale][0]],
    },
  );

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Menu menu={i18n.side_menu} locale={match.params.locale} />
          <main className={classes.main}>
            <Switch>
              <Route path="/:locale/articles/new" exact component={NewArticle} />
              <Route path="/:locale/clients/new" exact component={NewClient} />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </StylesProvider>
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
