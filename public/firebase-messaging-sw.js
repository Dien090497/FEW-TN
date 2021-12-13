importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDjSKFRfwAXtY2Xqwmh9n8u5Nt3QNCRQbg",
    authDomain: "few-tn.firebaseapp.com",
    projectId: "few-tn",
    storageBucket: "few-tn.appspot.com",
    messagingSenderId: "543894763023",
    appId: "1:543894763023:web:2ee9daa02adb977834957a",
    measurementId: "${config.measurementId}"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});