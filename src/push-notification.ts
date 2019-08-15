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

    const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(function () {
        console.log("Have permission");
        return messaging.getToken();
        }).then(function (token) {
            console.log(token)
    })
    .catch(function () {
        console.log("Have permission");
    })
}

