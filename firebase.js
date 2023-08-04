import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  /* YOUR FIREBASE CONFIG OBJECT PROPERTIES HERE */
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;
