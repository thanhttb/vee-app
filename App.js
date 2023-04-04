import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {registerRootComponent} from 'expo';
import 'react-native-gesture-handler';
import AppNav from './src/navigation/AppNav';

export default function App() {
  return (
    <>
    <AppNav/>
    </>
  );
}


