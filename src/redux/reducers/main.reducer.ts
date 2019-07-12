import { combineReducers } from 'redux';
import testReducer from './test.reducer';
import authReducer from './auth.reducer';

const mainReducer = combineReducers({
    testReducer,
    authReducer,
});

export default mainReducer;
