import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import Constants from "expo-constants";



// Replace this with your Firebase SDK config snippet

const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Auth
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });

// export {auth};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database  = getFirestore();