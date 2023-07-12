import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
//npm
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useDispatch, useSelector } from "react-redux";
//redux
import { loginAction } from "../../redux/actions/authActions";
//component
import Spacer from "../../components/Spacer";
import Button from "../../components/Button/Button";
//utils
import { SIZES, COLORS } from "../../utils/theme";
//iamges
const Logo_VEE = require("../../../assets/logo_vee.jpg");

const LoginRules = ({ navigation }) => {
  const { error, isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const submit = async (role) => {
    navigation.navigate("Login", {
        role: role
    });
  };


  return (
    <GestureHandlerRootView style={styles.safeview}>
      <StatusBar barStyle="dark-content" />
      {error == true &&
        Alert.alert("VietElite", "Tài khoản mật khẩu không chính xác", [
          {
            text: "Đóng",
            onPress: () => dispatch({type: "SET_LOGIN_CLEAR_STATE"}),
            style: "cancel",
          },
          { text: "OK",  onPress: () => dispatch({type: "SET_LOGIN_CLEAR_STATE"}) },
        ])}
      {/* <SafeAreaView > */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image source={Logo_VEE} style={styles.imageLogo} />
          {/* header  */}
         
          <View style={styles.inputs}>
           
            <Button
            loading={isLoading}
              onPress={() => submit(1)}
              label={"Đăng Nhập Dành Cho Phụ Huynh"}
              color={COLORS.white}
              background={COLORS.green}
            />
            <Spacer />
            <Button
            loading={isLoading}
              onPress={()=>submit(2)}
              label={"Đăng Nhập Dành Cho Giáo Viên"}
              color={COLORS.white}
              background={COLORS.green}
            />
            
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

export default LoginRules;

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
  },
  imageLogo: {
    height: SIZES.spacing * 13,
    width: SIZES.spacing * 23,
  },
  header: {
    paddingVertical: SIZES.spacing * 2,
  },
  headerTop: {
    textAlign: "center",
    fontSize: SIZES.h1,
    fontWeight: 700,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: SIZES.font,
    color: COLORS.green,
    fontWeight: 600,
    paddingTop: SIZES.spacing,
  },
  inputs: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding,
  },
  input: {
    flexDirection: "row",
    borderRadius: SIZES.base,
    height: SIZES.spacing * 5,
    borderWidth: 0.3,
    padding: SIZES.spacing,
    borderColor: COLORS.gray,
  },
  inputPassword: {
    justifyContent: "space-between",
  },
  forget: {
    paddingVertical: SIZES.spacing,
    color: COLORS.gray,
    fontSize: SIZES.h3,
    textAlign: 'right'
  },
});
