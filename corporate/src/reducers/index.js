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
  switch (action.type) {
    case SIGN_OUT_USER: {
      const { payload: { csrf: { resource_name: resource, authToken }, toast } } = action;
      return {
        ...initState,
        locale: rootState.locale,
        i18n: rootState.i18n,
        CSRF: { resource, authToken },
        toastMessage: toast,
      };
    }
    case FORCE_RESET: {
      const fatalError = {
        message: 'An error has occurred, please contact your administrator',
        type: 'fatal',
      };
      return {
        ...initState,
        CSRF: rootState.CSRF,
        i18n: rootState.i18n,
        toastMessage: rootState.i18n?.toast?.fatal_error || fatalError,
      }; }
    default:
      return appReducer(rootState, action);
  }
};

export default rootReducer;
