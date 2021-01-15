import { combineReducers } from 'redux';
import accountingAccountsReducer from './accountingAccountsReducer';
import articleGroupsReducer from './articleGroupsReducer';
import CSRFReducer from './CSRFReducer';
import fetchingReducer from './fetchingReducer';
import i18nReducer from './i18nReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  fetching: fetchingReducer,
  CSRF: CSRFReducer,
  i18n: i18nReducer,
  user: UserReducer,
  accountingAccounts: accountingAccountsReducer,
  articlesGroups: articleGroupsReducer,
});
