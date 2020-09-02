// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
  
  
  var firebaseConfig = {
    apiKey: "AIzaSyDIvmMzBiT1dwOoX24HaPIFemfAAA-BCs4",
    authDomain: "cbpoll-59e61.firebaseapp.com",
    databaseURL: "https://cbpoll-59e61.firebaseio.com",
    projectId: "cbpoll-59e61",
    storageBucket: "cbpoll-59e61.appspot.com",
    messagingSenderId: "142648358307",
    appId: "1:142648358307:web:e33192a72c9f6ccc555616",
    measurementId: "G-62YGGPDF20"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const myFirestore = firebase.firestore();
  export {firebase};
