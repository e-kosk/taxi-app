importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBr-3BjYtybQV3UX8R-ODhIVBcIW4MwEM0",
    authDomain: "taxi-app-f4bb8.firebaseapp.com",
    projectId: "taxi-app-f4bb8",
    storageBucket: "taxi-app-f4bb8.appspot.com",
    messagingSenderId: "615754435573",
    appId: "1:615754435573:web:ef03eafc970d7df63e6ebc",
    measurementId: "G-PW14W6MN4L"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});