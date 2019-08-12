import { combineReducers } from 'redux';
import testReducer from './test.reducer';
import authReducer from './auth.reducer';
import registerReducer from './register.reducer';

const mainReducer = combineReducers({
    testReducer,
    authReducer,
    registerReducer,
});

export default mainReducer;
