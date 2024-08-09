// // This sample application is using 9.22, make sure you are importing the same version
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js",
);
const firebaseApp = firebase.initializeApp({
  // apiKey: 'AIzaSyB2riDiZyYAqNXyC73my23NPB-x8KkeOI0',
  apiKey: '',
  authDomain: 'hopeisapp.firebaseapp.com',
  projectId: 'hopeisapp',
  storageBucket: 'hopeisapp.appspot.com',
  messagingSenderId: '520520413022',
  appId: '1:520520413022:web:88b40bba873a6b610ba9cf',
  measurementId: 'G-ELGXH8ZP63',
});

const messaging = firebase.messaging(firebaseApp);
