import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

console.log(' process.env.REACT_APP_APIKEY',  process.env.REACT_APP_APIKEY)

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  /* YOUR FIREBASE CONFIG OBJECT PROPERTIES HERE */
  // apiKey: process.env.REACT_APP_APIKEY,
  // authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASEURL,
  // projectId: process.env.REACT_APP_PROJECTID,
  // storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_APPID,
  // measurementId: process.env.REACT_APP_MEASUREMENTID

  apiKey: "AIzaSyDmlLl9XoEQ05MaGOdmJ-0SL6N8-QQhCTc",
    authDomain: "vietelite-chat.firebaseapp.com",
    projectId: "vietelite-chat",
    storageBucket: "vietelite-chat.appspot.com",
    messagingSenderId: "578384786335",
    appId: "1:578384786335:web:4f2fd313a3d1fb608943aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;