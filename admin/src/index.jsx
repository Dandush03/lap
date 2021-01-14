import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import storeConfig from './store';

import './styles/index.css';
import reportWebVitals from './reportWebVitals';

import Layout from './pages/Layout';
import SignIn from './pages/auth/SignIn';

const store = storeConfig();
const locale = Cookies.get('locale');
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Route path="/auth/sign_in" exact component={SignIn} />
        </Route>
        <Route path="/" exact><Redirect to={locale ? `/${locale}` : '/es'} /></Route>
        <Route path="/:locale" component={Layout} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
