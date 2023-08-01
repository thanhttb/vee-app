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

const Login = ({ route, navigation }) => {
  // const { role } = route?.params;

  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const { error, isLoading } = useSelector((state) => state.authReducer);

  const submit = async () => {
    if (phone == "" || password == "") {
      Alert.alert("VietElite", "Tài khoản, mật khẩu không được để trống", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
    } else if (!phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
      Alert.alert("VietElite", "Số điện thoại không đúng định dạng", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
    } else {
      dispatch(loginAction(phone, password));
    }
  };

  return (
    <GestureHandlerRootView style={styles.safeview}>
      <StatusBar barStyle="dark-content" />
      {error == true &&
        Alert.alert("VietElite", "Tài khoản mật khẩu không chính xác", [
          {
            text: "Đóng",
            onPress: () => dispatch({ type: "SET_LOGIN_CLEAR_STATE" }),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => dispatch({ type: "SET_LOGIN_CLEAR_STATE" }),
          },
        ])}
      {/* <SafeAreaView > */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image source={Logo_VEE} style={styles.imageLogo} />
          {/* header  */}
            <View style={styles.header}>
              <Text style={styles.headerTop}>VietElite App Phụ Huynh</Text>
              <Text style={styles.headerTitle}>
                Hệ thống thông tin dành cho Phụ Huynh VietElite
              </Text>
            </View>
          
          {/* Inputs  */}
          <View style={styles.inputs}>
            <View style={styles.input}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Số điện thoại đã đăng ký"}
                placeholderTextColor={COLORS.input}
                keyboardType="number-pad"
                autoCapitalize="none"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <Spacer />
            <View style={[styles.input, styles.inputPassword]}>
              <TextInput
                style={{ width: "90%" }}
                placeholder={"Mật khẩu"}
                placeholderTextColor={COLORS.input}
                secureTextEntry={showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                style={{ height: "100%", aspectRatio: 1 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword == true ? "eye-off" : "eye"}
                  size={24}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginRules")}
              >
                <Text style={[styles.forget, { textAlign: "left" }]}>
                  Quay lại
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("PasswordForgot")}
              >
                <Text style={styles.forget}>Quên mật khẩu ?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.inputs}>
            <Button
              loading={isLoading}
              onPress={submit}
              label={"Đăng Nhập"}
              color={COLORS.white}
              background={COLORS.green}
            />
            <Spacer />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

export default Login;

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
    textAlign: "right",
  },
});
