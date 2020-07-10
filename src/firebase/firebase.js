import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyAq4IVbltLPJd6qmhWRTrE9zurFtVsRzkM",
    authDomain: "encrypted-tones.firebaseapp.com",
    databaseURL: "https://encrypted-tones.firebaseio.com",
    projectId: "encrypted-tones",
    storageBucket: "encrypted-tones.appspot.com",
    messagingSenderId: "381782434364",
    appId: "1:381782434364:web:3ab1f83a2f959a32349939",
    measurementId: "G-MKMG4MC9DK"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  
  

  export {firebase, database as default};