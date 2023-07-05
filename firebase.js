import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// Replace this with your Firebase SDK config snippet

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "reactnative-mess.firebaseapp.com",
    databaseURL: "https://reactnative-mess-default-rtdb.firebaseio.com",
    projectId: "reactnative-mess",
    storageBucket: "reactnative-mess.appspot.com",
    messagingSenderId: "110129240809",
    appId: "1:110129240809:web:7b09c3731a79c54ef66e78",
    measurementId: "G-LB50JG95TP"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export {auth};