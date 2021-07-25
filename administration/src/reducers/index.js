import { combineReducers } from 'redux';
import { SIGN_OUT_USER, FORCE_RESET } from 'actions/actionsType';
import initState from '../store/initState';
import accountingAccountsReducer from './accountingAccountsReducer';
import articleGroupsReducer from './articleGroupsReducer';
import articlesReducer from './articlesReducer';
import CSRFReducer from './CSRFReducer';
import fetchingReducer from './fetchingReducer';
import i18nReducer from './i18nReducer';
import LocaleReducer from './localeReducer';
import taxesReducer from './taxesReducer';
import companyReducer from './companyReducer';
import UserReducer from './UserReducer';
import exchangesReducer from './exchangesReducer';
import toastMessageReducer from './toastMessageReducer';

const appReducer = combineReducers({
  locale: LocaleReducer,
  fetching: fetchingReducer,
  CSRF: CSRFReducer,
  i18n: i18nReducer,
  user: UserReducer,
  accountingAccounts: accountingAccountsReducer,
  articlesGroups: articleGroupsReducer,
  articles: articlesReducer,
  taxes: taxesReducer,
  company: companyReducer,
  exchanges: exchangesReducer,
  toastMessage: toastMessageReducer,
});

const rootReducer = (rootState, action) => {
  let state = rootState;
  if (action.type === SIGN_OUT_USER) {
    state = {
      ...initState,
      CSRF: rootState.CSRF,
      i18n: rootState.i18n,
      toastMessage: rootState.i18n?.toast?.sign_out_user || initState.toast,
    };
  }
  if (action.type === FORCE_RESET) {
    const fatalError = {
      message: 'An error has occurred, please contact your administrator',
      type: 'fatal',
    };
    state = {
      ...initState,
      CSRF: rootState.CSRF,
      i18n: rootState.i18n,
      toastMessage: rootState.i18n?.toast?.fatal_error || fatalError,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
