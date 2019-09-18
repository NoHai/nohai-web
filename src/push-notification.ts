import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { newNotificationReceived } from './redux/actions/notification.action';

export const initializeFirebase = () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDet8nQkb4kEGzdJtvDo4JA9GvXZ-7kUxg",
    authDomain: "nohai-pushnotification.firebaseapp.com",
    databaseURL: "https://nohai-pushnotification.firebaseio.com",
    projectId: "nohai-pushnotification",
    storageBucket: "",
    messagingSenderId: "44767533362",
    appId: "1:44767533362:web:522cde2738eae6fa"
  };
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  
  messaging.onMessage(function (payload) {
    console.log('onMessage: ', payload);
    mapDispatchToProps.newNotificationReceived()
  });


  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.', refreshedToken);
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      // Send Instance ID token to app server.
      // ...
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });

}

const mapDispatchToProps = {
  newNotificationReceived,
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    return token;
  } catch (error) {
    console.error(error);
  }
 }

