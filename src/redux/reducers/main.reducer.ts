import { combineReducers } from 'redux';
import testReducer from './test.reducer';
import authReducer from './auth.reducer';
import notificationReducer from './notification.reducer';
import registerReducer from './register.reducer';

const mainReducer = combineReducers({
  testReducer,
  authReducer,
  registerReducer,
  notificationReducer,
});

export default mainReducer;
