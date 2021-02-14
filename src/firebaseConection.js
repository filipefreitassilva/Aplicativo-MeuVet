import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyBHdVmPGyl2nssAlmn5LUE-EDJrx4dl7xs",
    authDomain: "meuvet-6c1a2.firebaseapp.com",
    projectId: "meuvet-6c1a2",
    storageBucket: "meuvet-6c1a2.appspot.com",
    messagingSenderId: "1062513578154",
    appId: "1:1062513578154:web:5085774fe1526ab4b380d3",
    measurementId: "G-RKPBW3NMGY"
  };

  if(!firebase.apps.length){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
 