import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
import axios from "axios";
import Button from "../../components/Button/Button";
import Spacer from "../../components/Spacer";
import { Alert } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
//components

const ProfileChange = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [password, setPassword] = React.useState({
    current_password: "",
    password: "",
    confirm: "",
  });

  const handleChangeSubmit = async () => {
    axios
      .post(
        BASE_URL + "profile/change-password",
        {
          old_password: password?.current_password,
          new_password: password?.password,
          new_password_confirmation: password?.confirm,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        Alert.alert(
          "VietElite",
          "Cập nhập thông tin cá nhân thành công",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          {
            userInterfaceStyle: "light",
          }
        ),
          setPassword({
            current_password: "",
            password: "",
            confirm: "",
          });
      })
      .catch((err) =>
        Alert.alert(
          "VietElite",
          "Cập nhập thông tin cá nhân thất bại",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          {
            userInterfaceStyle: "light",
          }
        )
      );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <GestureHandlerRootView style={styles.safeview}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              <StatusBar barStyle="light-content" />
              <View style={styles.container}>
                {/* <Text style={styles.info}>Thông tin bố/mẹ</Text> */}
                <TextInput
                  style={styles.input}
                  label="Mật khẩu cũ"
                  value={password?.current_password}
                  onChangeText={(text) =>
                    setPassword({ ...password, current_password: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                  secureTextEntry={true}
                  right={<TextInput.Icon name="eye" />}
                />
                <TextInput
                  style={styles.input}
                  label="Mật khẩu mới"
                  value={password?.password}
                  onChangeText={(text) =>
                    setPassword({ ...password, password: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                  secureTextEntry={true}
                  right={<TextInput.Icon name="eye" />}
                />
                <TextInput
                  style={styles.input}
                  label="Xác nhận mật khẩu mới"
                  value={password?.confirm}
                  onChangeText={(text) =>
                    setPassword({ ...password, confirm: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                  secureTextEntry={true}
                  
                />

                <Spacer />
                <Button
                  onPress={handleChangeSubmit}
                  label={"Lưu thay đổi"}
                  color={COLORS.white}
                  background={COLORS.green}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default ProfileChange;

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: SIZES.padding,
  },
  info: {
    fontSize: SIZES.h2,
    fontWeight: 500,
    paddingBottom: SIZES.spacing,
    color: COLORS.gray,
  },
  input: {
    height: 50,
    borderColor: COLORS.input,
    backgroundColor: "white",
    marginBottom: SIZES.spacing,
  },
});
