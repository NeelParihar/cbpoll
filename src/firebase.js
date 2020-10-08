
import firebase from "firebase/app";


import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
  
  
  var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR-URL",
    projectId: "YOUR-ID",
    storageBucket: "YOURBUCKET",
    messagingSenderId: "",
    appId: "YOUR-APP-ID",
    measurementId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const myFirestore = firebase.firestore();
  export {firebase};
