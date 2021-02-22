import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  Backdrop, CircularProgress, Collapse, createMuiTheme,
  IconButton, jssPreset, StylesProvider, ThemeProvider,
} from '@material-ui/core';
import * as locales from '@material-ui/core/locale';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { Alert } from '@material-ui/lab';
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '../containers/Menu';
import getI18n from '../actions/i18n';
import { getSignedUser } from '../actions/user';
import NewArticle from './articles/NewArticle';
import useStyles from '../styles/layout';
import NewClient from './clients/NewClient';
import ExchangesIndex from './exchanges/ExchangesIndex';
import AddExchangeRate from '../containers/AddExchangeRate';
import isExchangeUpdate from '../javascripts/dateFunctions';

const Layout = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const CSRF = useSelector((state) => state.CSRF);
  const exchanges = useSelector((state) => state.exchanges);
  const fetching = useSelector((state) => state.fetching);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newExchange, setNewExchange] = useState(false);
  const [exchangeAlert, setExchangeAlert] = useState(true);

  const lang = {
    he: ['heIL', 'rtl'],
    en: ['enUS', 'ltr'],
    es: ['esES', 'ltr'],
  };

  const { locale } = match.params;

  useEffect(() => {
    Cookies.set('locale', locale);
    if (!i18n) dispatch(getI18n());
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('dir', lang[locale][1]);
  }, []);

  useEffect(async () => {
    if (CSRF.authToken && !user.login) history.push('/auth/sign_in');
    if (!CSRF.authToken) dispatch(getSignedUser());
  }, [CSRF]);

  useEffect(() => {
    if (isExchangeUpdate(exchanges)) {
      setExchangeAlert(false);
    } else {
      setExchangeAlert(true);
    }
  }, [exchanges]);

  if (!user.login || !i18n) {
    return (
      <Backdrop className={classes.fetching} open>
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
          <Menu menu={i18n.side_menu} locale={match.params.locale} exchange={setNewExchange} />
          <main className={classes.main}>
            <AddExchangeRate
              open={setNewExchange}
              isOpen={newExchange}
            />
            <Collapse className={classes.alertContainer} in={exchangeAlert}>
              <Alert
                severity="warning"
                className={classes.alert}
                action={(
                  <div>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setNewExchange(true);
                      }}
                    >
                      <UpdateIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setExchangeAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </div>
              )}
              >
                {i18n.exchange_warning}
              </Alert>
            </Collapse>
            <Backdrop className={classes.fetching} open={!!fetching}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <Switch>
              <Route path="/:locale/articles/new" exact component={NewArticle} />
              <Route path="/:locale/clients/new" exact component={NewClient} />
              <Route path="/:locale/exchange" exact component={() => <ExchangesIndex locale={locale} />} />
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
