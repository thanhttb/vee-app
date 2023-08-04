import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import AppStack from "./AppStack";
import TabNavigation from "./TabNavigation";
import { initialize } from "../redux/actions/authActions";
import { View, ActivityIndicator, StatusBar } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { BASE_URL } from "../../config";
import axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AppNav = () => {
  const { authToken, user } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const dispath = useDispatch();
  
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  async function registerForPushNotificationsAsync() {
    let tokenRes;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert('Failed to get push token for push notification!');
        // return;
      }
      tokenRes = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      // alert('Must use physical device for Push Notifications');
    }
  
    return tokenRes;
  }

  useEffect(() => {
    // dang ky thong bao
    registerForPushNotificationsAsync().then((tokenRes) => {
      setExpoPushToken(tokenRes);
    });

    // them noti listen
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    // phan hoi listen
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
          //notification is received OK
          console.log("opened", response?.notification?.request);
          
          //here I want to navigate to another screen using rootnavigation
          // navigation.navigate("Account"); 

      }
  );
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      Notifications.dismissAllNotificationsAsync();
    };
  }, [lastNotificationResponse]);

  useEffect(() => {
    const dataRes = async () => {
      await axios
        .post(
          BASE_URL + "device-token",
          {
            device_token: expoPushToken,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + authToken,
            },
          }
        )
        .then((response) => console.log("device-token successfully"))
        .catch((err) => console.error("device-token failed", err));
    };
    dataRes();
  }, [authToken]);
  console.log('expoPushToken',
    expoPushToken
  )

  const init = async () => {
    await dispath(initialize());
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {authToken == undefined || authToken == null ? (
          <AppStack />
        ) : (
          <TabNavigation />
        )}
      </NavigationContainer>
    </>
  );
};

export default AppNav;
