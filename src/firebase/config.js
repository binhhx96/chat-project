import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBVPtWRaOBOqmLnZHx--BkT6SU2ol0ae94",
    authDomain: "chat-app-5fce9.firebaseapp.com",
    projectId: "chat-app-5fce9",
    storageBucket: "chat-app-5fce9.appspot.com",
    messagingSenderId: "672884934651",
    appId: "1:672884934651:web:e707bb34539984079ead5e",
    measurementId: "G-7XDZ85QRC5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

  export {auth, db};
  export default firebase;