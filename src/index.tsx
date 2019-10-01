import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store/configure.store';
import { initializeFirebase } from './business/services/push-notification.service';
import StoreUtility from './utilities/core/store.utility';

const store = configureStore();
StoreUtility.init(store);

ReactDOM.render(
  <Provider store={store}>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGM0DeAzD2CFJZe4V2KEkRAUNLO2Jq9mU&libraries=places"></script>
    <App />
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
initializeFirebase();
serviceWorker.register();

export default store;
