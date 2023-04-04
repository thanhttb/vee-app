import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
} from "react-native";
//npm
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
//component
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
//utils
import { SIZES, COLORS } from "../../utils/theme";
//iamges
const Logo_VEE = require("../../../assets/logo_vee.jpg");

const Login = ({navigation}) => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");

  return (
    <GestureHandlerRootView style={styles.safeview}>
      <StatusBar barStyle="dark-content" />
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
              Hệ thống thông tin dành cho phụ huynh VietElite
            </Text>
          </View>
          {/* Inputs  */}
          <View style={styles.inputs}>
            <View style={styles.input}>
              <TextInput
                placeholder={"Số điện thoại đã đăng ký"}
                placeholderTextColor={COLORS.input}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>
            <Spacer />
            <View style={[styles.input, styles.inputPassword]}>
              <TextInput
                placeholder={"Mật khẩu"}
                placeholderTextColor={COLORS.input}
                autoCapitalize="none"
                secureTextEntry={true}
              />
              <TouchableOpacity style={{ height: "100%", aspectRatio: 1 }}>
                <Ionicons name="eye" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.forget}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
          </View>
          <Spacer />
          <View style={styles.inputs}>
            <Button
            onPress={() => navigation.navigate('PasswordForgot')}
              label={"Đăng Nhập"}
              color={COLORS.white}
              background={COLORS.green}
            />
            <Spacer />
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
            }}>
              <View style={{height:1, width: "45%", backgroundColor: COLORS.gray}}></View>
              <Text style={{fontSize:SIZES.h3, fontWeight: 600, color:COLORS.gray}}> Hoặc </Text>
              <View style={{height:1, width: "45%", backgroundColor: COLORS.gray}}></View>
            </View>
            <Spacer />
            <Button
              label={"Đăng Nhập Bằng Zalo"}
              color={COLORS.green}
              background={COLORS.white}
            />
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
    paddingVertical: SIZES.spacing * 4,
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
    padding: SIZES.spacing,
    color: COLORS.gray,
    fontSize: SIZES.h3,
  },
});
