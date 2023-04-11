import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { Provider, useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import AppNav from "./src/navigation/AppNav";
import { store } from "./src/redux/store";
import { LogBox } from "react-native";


export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNav />
      </Provider>
    </>
  );
}
