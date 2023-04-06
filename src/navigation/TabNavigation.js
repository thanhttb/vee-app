import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Notifications from "../screens/Notifications";
import Schedule from "../screens/Schedule";
import HomeDetails from "../screens/HomeDetails";
import { COLORS } from "../utils/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Trang chính"
        component={Home}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name="Trang thông tin"
        component={HomeDetails}
        options={({ route }) => 
          ({ 
            id: route.params.id,
            title: route.params.name,
            headerStyle: {
              backgroundColor: COLORS.green,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
           })
       }
      />
    </Stack.Navigator>
  );
};


const TabNavigation = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Trang chủ"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Trang chủ") {
              iconName = focused
                ? require("../../assets/icon/Home_Focus.png")
                : require("../../assets/icon/Home_Outline.png");
            }
            return (
              <Image
                source={iconName}
                style={{ width: 24, height: 24 }}
                resizeMode="stretch"
              />
            );
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
        })}
      />
      <Tab.Screen name="Lịch học" component={Schedule} 
      options={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Lịch học") {
            iconName = focused
              ? require("../../assets/icon/Schedule_Outline.png")
              : require("../../assets/icon/Schedule_Outline.png");
          }
          return (
            <Image
              source={iconName}
              style={{ width: 24, height: 24 }}
              resizeMode="stretch"
            />
          );
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray,
      })}/>
      <Tab.Screen name="Thông báo" component={Notifications} 
       options={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Thông báo") {
            iconName = focused
              ? require("../../assets/icon/Noti_Outline.png")
              : require("../../assets/icon/Noti_Outline.png");
          }
          return (
            <Image
              source={iconName}
              style={{ width: 20, height: 24 }}
              resizeMode="stretch"
            />
          );
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray,
      })}/>
      <Tab.Screen name="Tài khoản" component={Profile} 
      options={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Tài khoản") {
            iconName = focused
              ? require("../../assets/icon/User_Outline.png")
              : require("../../assets/icon/User_Outline.png");
          }
          return (
            <Image
              source={iconName}
              style={{ width: 20, height: 24}}
              resizeMode="stretch"
            />
          );
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray,
      })}/>
    </Tab.Navigator>
  );
};

export default TabNavigation;
