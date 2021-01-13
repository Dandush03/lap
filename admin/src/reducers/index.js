import { combineReducers } from 'redux';
import CSRFReducer from './CSRFReducer';
import i18nReducer from './i18nReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  user: UserReducer,
  CSRF: CSRFReducer,
  i18n: i18nReducer,
});
