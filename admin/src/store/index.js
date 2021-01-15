import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const initState = {
  fetching: 0,
  CSRF: { authToken: null, resource: null },
  i18n: null,
  user: { login: false },
  accountingAccounts: { buy: [], sell: [], inv: [] },
  articlesGroups: [],
  flashMessages: { status: null, msg: null },
};

export default function configureStore() {
  const store = createStore(
    reducers,
    initState,
    composeWithDevTools(
      applyMiddleware(
        thunk,
      ),
    ),
  );
  return store;
}
