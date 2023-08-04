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

  apiKey: "AIzaSyDbtJM8-eC0iE4mLH6hPRl4G8_AijNq0Q8",
  authDomain: "reactnative-mess.firebaseapp.com",
  databaseURL: "https://reactnative-mess-default-rtdb.firebaseio.com",
  projectId: "reactnative-mess",
  storageBucket: "reactnative-mess.appspot.com",
  messagingSenderId: "110129240809",
  appId: "1:110129240809:web:7b09c3731a79c54ef66e78",
  measurementId: "G-LB50JG95TP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;