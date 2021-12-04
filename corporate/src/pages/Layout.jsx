import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';

// Matirial UI
import {
  Collapse, createMuiTheme, IconButton, jssPreset, StylesProvider, ThemeProvider,
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';

// Actions
import getI18n from 'actions/i18n';
import getLocale from 'actions/locale';
import { getSignedUser } from 'actions/user';

// Share Components & Containers
import Loading from 'shared-components/Loading';
import ExchangesIndex from 'pages/exchanges/ExchangesIndex';

// Javascript
import isExchangeUpdate from 'javascripts/dateFunctions';

// Styles
import useStyles from 'styles/layout';

// Pages
import NewArticle from 'pages/articles/NewArticle';
import NewClient from 'pages/clients/NewClient';
import AddExchangeRate from 'pages/exchanges/containers/AddExchangeRate';

// Component
import Menu from 'shared-containers/Menu';
import ToastMessages from './shared-containers/ToastMessages';

const Layout = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const locale = useSelector((state) => state.locale);
  const CSRF = useSelector((state) => state.CSRF);
  const exchanges = useSelector((state) => state.exchanges);
  const fetching = useSelector((state) => state.fetching);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newExchange, setNewExchange] = useState(false);
  const [validated, setValidated] = useState(false);
  const [exchangeAlert, setExchangeAlert] = useState(false);

  const lang = {
    he: ['heIL', 'rtl'],
    en: ['enUS', 'ltr'],
    es: ['esES', 'ltr'],
  };

  useEffect(() => {
    if (!i18n) dispatch(getI18n());
    if (!locale) dispatch(getLocale());
  }, []);

  useEffect(() => {
    if (locale) {
      const body = document.getElementsByTagName('body')[0];
      body.setAttribute('dir', lang[locale][1]);
    }
  }, [locale]);

  useEffect(async () => {
    if (CSRF.authToken && !user.login) history.push('/corporate/auth/sign_in');
    if (!CSRF.authToken) dispatch(getSignedUser());
  }, [CSRF]);

  useEffect(() => {
    if (CSRF && i18n && user.login && locale) {
      setValidated(true);
    }
  }, [CSRF, i18n, user, locale]);

  useEffect(() => {
    setExchangeAlert(isExchangeUpdate(exchanges));
  }, [exchanges]);

  if (!validated) return (<Loading />);

  const theme = createMuiTheme(
    {
      direction: lang[locale][1],
      locales: i18n,
    },
  );

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <ToastMessages />
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
            <Loading open={!!fetching} />
            <Switch>
              <Route path="/articles/new" exact component={NewArticle} />
              <Route path="/clients/new" exact component={NewClient} />
              <Route path="/exchange" exact component={() => <ExchangesIndex />} />
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
