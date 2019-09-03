import * as firebase from 'firebase/app';
import 'firebase/messaging';


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
}

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

