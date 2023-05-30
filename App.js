import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { Provider, useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import AppNav from "./src/navigation/AppNav";
import { store } from "./src/redux/store";
import { LogBox } from "react-native";
import moment from "moment";
require('moment/locale/vi');
import { YellowBox } from 'react-native';
import { useEffect } from "react";


export default function App() {
  useEffect(() => {
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
}, [])

  return (
    <>
      <Provider store={store}>
        <AppNav />
      </Provider>
    </>
  );
}
