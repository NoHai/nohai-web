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
  var result = JSON.parse(payload);
  var notificationTitle = payload.notification.title; //or payload.notification or whatever your payload is
  var notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    time_to_live: result.time_to_live,
    tag: result.tag,
    data: { url: payload.notification.click_action },
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = 'YOUR_ICON';
  var tag = 'simple-push-demo-notification-tag';
  var data = {
    doge: {
        wow: 'such amaze notification data'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data: data
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});
