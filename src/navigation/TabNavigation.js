import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../utils/theme";
import { Image } from "react-native";
import Home from "../screens/Home/Home";
import Notifications from "../screens/Notifications/Notifications";
import HomeSchedule from "../screens/Home/HomeSchedule";
import HomeDetails from "../screens/Home/HomeDetails";
import HomeWork from "../screens/Home/HomeWork";
import HomeTuition from "../screens/Home/HomeTuition";

import ProfileHome from "../screens/Profile/ProfileHome";
import ProfileParent from "../screens/Profile/ProfileParent";
import ProfileChildren from "../screens/Profile/ProfileChildren";
import ProfileChange from "../screens/Profile/ProfileChange";
import HomeLeave from "../screens/Home/HomeLeave";
import HomeTutoring from "../screens/Home/HomeTutoring";
import HomeWorkDetail from "../screens/Home/HomeWorkDetail";
import HomeSituation from "../screens/Home/HomeSituation";
import HomeDetailTution from "../screens/Home/HomeDetailTution";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Trang chính"
        component={Home}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Trang thông tin"
        component={HomeDetails}
        options={({ route }) => ({
          id: route.params.id,
          title: route.params.name,
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Tình hình học tập"
        component={HomeSituation}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Bài tập về nhà"
        component={HomeWorkStack}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          unmountOnBlur: true,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Học phí"
        component={HomeTuition}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // unmountOnBlur: true, headerShown: false
        })}
      />

      <Stack.Screen
        name="Chi tiết học phí"
        component={HomeDetailTution}
        options={({ route }) => ({
          dataItem: {
            id: route.params?.id,
          },
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />

      <Stack.Screen
        name="Đơn xin nghỉ"
        component={HomeLeave}
        options={({ route }) => ({
          dataItem: {
            id: route.params?.id,
          },
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />

      <Stack.Screen
        name="Đơn học phụ đạo"
        component={HomeTutoring}
        options={({ route }) => ({
          dataItem: {
            id: route.params?.id,
          },
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />

      <Stack.Screen
        name="Lịch học"
        component={HomeSchedule}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tài khoản"
        component={ProfileHome}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Thông tin phụ huynh"
        component={ProfileParent}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Thông tin học sinh"
        component={ProfileChildren}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Đổi mật khẩu"
        component={ProfileChange}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const HomeWorkStack = ({ navigation }) => {
  return (
    <Stack.Navigator options={{ unmountOnBlur: true, headerShown: false }}>
      <Stack.Screen
        name="Bài tập về nhà"
        component={HomeWork}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
          unmountOnBlur: true,
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color="white"
              onPress={() => navigation.navigate("Trang chính")}
            />
          ),
        })}
        // options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Bài tập về nhà chi tiết"
        component={HomeWorkDetail}
        options={({ route }) => ({
          dataItem: {
            id: route.params?.id,
          },
          unmountOnBlur: true,
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Thông tin học sinh"
        component={ProfileChildren}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Trang chủ") {
              iconName = !focused
                ? require("../../assets/Icon-bottom/Trang_Chu.png")
                : require("../../assets/Icon-bottom/Trang_Chu_Xanh.png");
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
      <Tab.Screen
        name="Lịch học"
        component={HomeSchedule}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Lịch học") {
              iconName = !focused
                ? require("../../assets/Icon-bottom/Lich_Hoc.png")
                : require("../../assets/Icon-bottom/Lich_Hoc_Xanh.png");
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
      <Tab.Screen
        name="Thông báo"
        component={Notifications}
        options={({ route }) => ({
          // headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Thông báo") {
              iconName = !focused
                ? require("../../assets/Icon-bottom/Thong_Bao.png")
                : require("../../assets/Icon-bottom/Thong_Bao_Xanh.png");
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
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Profile") {
              iconName = !focused
                ? require("../../assets/Icon-bottom/Tai_Khoan.png")
                : require("../../assets/Icon-bottom/Tai_Khoan_Xanh.png");
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
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
