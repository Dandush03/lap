import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const initState = {
  fetching: 0,
  user: {
    login: false,
  },
  CSRF: {
    authToken: null,
    resource: null,
  },
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
