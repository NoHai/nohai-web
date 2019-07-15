import { combineReducers } from 'redux';
import testReducer from './test.reducer';
import authReducer from './auth.reducer';
import eventReducer from './event.reducer';

const mainReducer = combineReducers({
    testReducer,
    authReducer,
    eventReducer,
});

export default mainReducer;
