import { combineReducers } from 'redux';
import testReducer from './test.reducer';

const mainReducer = combineReducers({
    testReducer,
});

export default mainReducer;
