import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { COLORS, SIZES } from "../utils/theme";
import { Image, Button } from "react-native";

import Notifications from "../screens/Notifications/Notifications";

import ProfileHome from "../screens/Profile/ProfileHome";
import ProfileParent from "../screens/Profile/ProfileParent";
import ProfileChildren from "../screens/Profile/ProfileChildren";
import ProfileChange from "../screens/Profile/ProfileChange";

import Home from "../screens/Home/Home";
import HomeNews from "../screens/Home/HomeNews";
import HomeSituation from "../screens/Home/HomeSituation";
import HomeDetailTution from "../screens/Home/HomeDetailTution";
import HomeDetailSituation from "../screens/Home/HomeDetailSituation";
import HomeWork from "../screens/Home/HomeWork";
import HomeTuition from "../screens/Home/HomeTuition";
import HomeChats from "../screens/Home/HomeChats";

import Schedule from "../screens/Schedule/Schedule";
import ScheduleLeave from "../screens/Schedule/ScheduleLeave";
import ScheduleTutoring from "../screens/Schedule/ScheduleTutoring";
import ListSurveys from "../screens/Survey/ListSurveys";
import { Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import SurveyResult from "../screens/Survey/SurveyResult";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Trang chính">
      <Stack.Screen
        name="Trang chính"
        component={Home}
        // lazy={false}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Bảng tin"
        component={HomeNews}
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
        name="Tình hình học tập"
        component={HomeSituation}
        lazy={false}
        options={({ route }) => ({
          dataItem: {
            data: route.params?.data,
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
        name="Tình hình học tập chi tiết"
        component={HomeDetailSituation}
        options={({ route }) => ({
          // dataItem: {
          //   classId: route.params?.classId,
          // },
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
        name="Tư liệu buổi học"
        component={HomeWork}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // headerShown: false,
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
            item: route.params.item,
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
        name={`Liên hệ giáo viên`}
        component={HomeChats}
        options={({ route, navigation }) => ({
          // dataItem: {
          //   id: route.params?.id,
          // },
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: (props) => {
            `Liên hệ giáo viên ${route?.params?.teacher}`;
          },
          // title: (props) => {`Liên hệ giáo viên ${route?.params?.teacher}`}
        })}
      />
    </Stack.Navigator>
  );
};

const ScheduleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lịch học"
        component={Schedule}
        options={{
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="Đơn xin nghỉ"
        component={ScheduleLeave}
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
        component={ScheduleTutoring}
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

const NotiStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Thông tin"
        component={Notifications}
        options={{
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SurveyStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Danh sách khảo sát">
      <Stack.Screen
        name="Danh sách khảo sát"
        component={ListSurveys}
        options={{
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTitle: (props) => (
            <Text style={{ fontSize: SIZES.h2, color: COLORS.white }}>
              Danh sách khảo sát
            </Text>
          ),
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.white}
              onPress={() => navigation.navigate("Trang chủ")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Kết quả khảo sát"
        component={SurveyResult}
        options={{
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          headerTitle: (props) => (
            <Text style={{ fontSize: SIZES.h2, color: COLORS.white }}>
              Kết quả khảo sát
            </Text>
          ),
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.white}
              onPress={() => navigation.navigate("Danh sách khảo sát")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        lazy={true}
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          // unmountOnBlur: true,
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
        name="Thời khóa biểu"
        component={ScheduleStack}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: COLORS.green,
          },
          unmountOnBlur: true,
          headerShown: false,
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Thời khóa biểu") {
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
        component={NotiStack}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
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
                : require("../../assets/Icon-bottom/Thong_Bao(1).png");
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
        name="Cá nhân"
        component={ProfileStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Cá nhân") {
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

      <Tab.Screen
        name="Khảo sát"
        component={SurveyStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
