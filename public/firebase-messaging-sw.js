importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var firebaseConfig = {
  apiKey: 'AIzaSyDet8nQkb4kEGzdJtvDo4JA9GvXZ-7kUxg',
  authDomain: 'nohai-pushnotification.firebaseapp.com',
  databaseURL: 'https://nohai-pushnotification.firebaseio.com',
  projectId: 'nohai-pushnotification',
  storageBucket: '',
  messagingSenderId: '44767533362',
  appId: '1:44767533362:web:522cde2738eae6fa',
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  var notificationTitle = payload.notification.title; //or payload.notification or whatever your payload is
  var notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data: { url: payload.notification.click_action },
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});

self.addEventListener('push', function(event) {
  const data = event.data.json();
  var notificationTitle = data.notification.title; //or payload.notification or whatever your payload is
  var notificationOptions = {
    body: data.notification.body,
    icon: data.notification.icon,
    data: { url: data.notification.click_action },
  };

 
  event.waitUntil(
    self.registration.showNotification(data.notification.title, {
      body: data.notification.body,
      icon: data.notificationicon,
      tag: data.notification.tag,
    })
  );
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
});
