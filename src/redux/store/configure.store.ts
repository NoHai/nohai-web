import { createStore } from 'redux';
import mainReducer from '../reducers/main.reducer';

const configureStore = () => {
    return createStore(mainReducer);
};

export default configureStore;
