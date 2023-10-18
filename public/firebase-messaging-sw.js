importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCucFTNq-u6rKBs1pdFa8BbwLu9TJMszIk",
  authDomain: "desig-6034e.firebaseapp.com",
  projectId: "desig-6034e",
  storageBucket: "desig-6034e.appspot.com",
  messagingSenderId: "377775905449",
  appId: "1:377775905449:web:89828aae0b5638a360a7b8",
  measurementId: "G-BVRJNF6SWY",
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
