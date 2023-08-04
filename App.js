import "./ignoreWarning";
import { Provider, useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import AppNav from "./src/navigation/AppNav";
import { store } from "./src/redux/store";
require("moment/locale/vi");
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </Provider>
    </>
  );
}
