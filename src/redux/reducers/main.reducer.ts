import { combineReducers } from 'redux';
import testReducer from './test.reducer';
import authReducer from './auth.reducer';
import eventReducer from './event.reducer';
import registerReducer from './register.reducer';

const mainReducer = combineReducers({
    testReducer,
    authReducer,
    eventReducer,
    registerReducer,
});

export default mainReducer;
