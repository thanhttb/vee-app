import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import configFirebase from "./configFirebase";
// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  /* YOUR FIREBASE CONFIG OBJECT PROPERTIES HERE */
  apiKey: configFirebase.API_KEY,
  authDomain: configFirebase.AUTH_DOMAIN,
  projectId: configFirebase.PROJECT_ID,
  storageBucket: configFirebase.STORAGE_BUCKET,
  messagingSenderId: configFirebase.MESSAGING_SENDER_ID,
  appId: configFirebase.APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;
