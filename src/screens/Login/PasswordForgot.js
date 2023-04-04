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

//component
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import OTPInput from "../../components/OTPInput";
//utils
import { SIZES, COLORS } from "../../utils/theme";
//iamges
const Logo_VEE = require("../../../assets/logo_vee.jpg");

const PasswordForgot = () => {
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
          {/* <View style={styles.header}>
            <Text style={styles.headerTitle}>
             Nhập số điện thoại để nhận mã xác thực
            </Text>
          </View>

          <View style={styles.inputs}>
            <View style={styles.input}>
              <TextInput
                placeholder={"Số điện thoại đã đăng ký"}
                placeholderTextColor={COLORS.input}
                keyboardType="number-pad"
                autoCapitalize="none"
                style={{
                    width: '100%',
                }}
              />
            </View>
           
          </View>
          <Spacer />
          <View style={styles.inputs}>
            <Button
              label={"Tiếp tục"}
              color={COLORS.white}
              background={COLORS.green}
            />
            
          </View> */}

          <View
            style={{
              marginLeft: 30,
            }}
          >
            <OTPInput />
          </View>
          <View style={styles.inputs}>
            <Button
              label={"Xác Minh"}
              color={COLORS.white}
              background={COLORS.green}
            />
          </View>
          <Spacer height={30} />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.bottomTitle}>Không nhận được mã OTP ?</Text>
            <TouchableOpacity>
              <Text style={styles.returnOtp}>Gửi lại mã</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

export default PasswordForgot;

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
  headerTitle: {
    textAlign: "center",
    fontSize: SIZES.h2,
    color: COLORS.gray,
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
  bottomTitle: {
    color: 'black',
    textAlign: "center",
    fontSize: SIZES.h2,
  },
  returnOtp: {
    color: COLORS.green,
    fontSize: SIZES.h2,
    fontWeight: 600,
    paddingLeft: SIZES.base
  }
});
