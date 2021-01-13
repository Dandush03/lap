import { combineReducers } from 'redux';
import CSRFReducer from './CSRFReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  user: UserReducer,
  CSRF: CSRFReducer,
});
