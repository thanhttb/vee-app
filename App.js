import './ignoreWarning';
import { Provider, useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import AppNav from "./src/navigation/AppNav";
import { store } from "./src/redux/store";
import { LogBox } from "react-native";
import moment from "moment";
require('moment/locale/vi');
import { useEffect } from "react";


export default function App() {


  return (
    <>
      <Provider store={store}>
        <AppNav />
      </Provider>
    </>
  );
}
