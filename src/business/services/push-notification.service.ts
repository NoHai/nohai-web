import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { newNotificationReceived } from '../../redux/actions/notification.action';
import StoreUtility from '../../utilities/core/store.utility';
import { FirebaseConfig } from '../../contracts/models/env-models/firebase.config';


export const initializeFirebase = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = new FirebaseConfig();
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onMessage(function (payload) {
    console.log('Token refreshed.',payload);
    StoreUtility.store.dispatch(newNotificationReceived(1));

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

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch (error) {
    console.error(error);
  }
}

