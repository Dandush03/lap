import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import storeConfig from './store';

import reportWebVitals from './reportWebVitals';

import Layout from './pages/Layout';
import SignIn from './pages/auth/SignIn';

const store = storeConfig();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Route path="/auth/sign_in" exact component={SignIn} />
        </Route>
        <Route path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
