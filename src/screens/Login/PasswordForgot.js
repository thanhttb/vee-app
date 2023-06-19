import React, { useRef, useState } from "react";
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
  Alert
} from "react-native";
//npm
import Recaptcha from "react-native-recaptcha-that-works";
import ReCAPTCHA from "react-google-recaptcha";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
//component
import Spacer from "../../components/Spacer";
import Button from "../../components/Button/Button";
import OTPInput from "../../components/OTPInput";
//utils
import { SIZES, COLORS } from "../../utils/theme";
//image
const Logo_VEE = require("../../../assets/logo_vee.jpg");

import axios from "axios";
import {BASE_URL} from '../../../config'

const PasswordForgot = () => {
  const recaptcha = useRef();
  const now = new Date();
  const [otp, setOtp] = React.useState(false);
  const [phone, setPhone] = React.useState();
  const [otpInput, setOtpInput] = useState("");

  const navigation = useNavigation();

  const send = () => {
    // this.recaptcha?.current.open();
    axios.post('https://api.vietelite.edu.vn/api/user/verify-phone', {
      phone: phone,
      sent_at : now
    })
    .then((response)=> {
      if(response){
        setOtp(!otp)
      }
    }).catch((error) => {
      Alert.alert(
        "VietElite",
        "Số điện thoại sai hoặc có lỗi xảy ra",
        [
          { text: "Đồng ý", onPress: () => console.log("OK Pressed") },
         
        ],
        {
          userInterfaceStyle: "light",
        }
      );
    })
    
  };

  const verifyOtp = () => {
    axios
      .post("https://api.vietelite.edu.vn/api/user/verify-otp", {
        phone: phone,
        otp: otpInput,
      })
      .then((response) => navigation.navigate("Trang chủ", {
          screen: "Trang chính",
          initial: false,
        })
      )
      .catch((error) => {
        Alert.alert(
          "VietElite",
          "Mã OTP sai hoặc có lỗi xảy ra",
          [{ text: "Đồng ý", onPress: () => console.log("OK Pressed") }],
          {
            userInterfaceStyle: "light",
          }
        );
      });
  };

  const handleClosePress = React.useCallback(() => {
    // this.recaptcha?.current.close();
  }, []);

  return (
    <GestureHandlerRootView style={styles.safeview}>
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView > */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image source={Logo_VEE} style={styles.imageLogo} />
          {/* forgot password  */}

          {otp == false && (
            <>
              <View style={styles.header}>
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
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
             
              <Spacer />
              <View style={styles.inputs}>
                <Button
                  onPress={send}
                  label={"Gửi"}
                  color={COLORS.white}
                  background={COLORS.green}
                />
                <Spacer />
                <Button
                  onPress={() => navigation.navigate('Login')}
                  label={"Quay lại"}
                  color={COLORS.green}
                  background={COLORS.white}
                />
              </View>
            </>
          )}

          {otp == true && (
            <>
              <View
                style={{
                  marginLeft: 30,
                }}
              >
                <OTPInput setOtpInput={setOtpInput} otpInput={otpInput}/>
              </View>
              <View style={styles.inputs}>
                <Button
                  onPress={verifyOtp}
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
                <TouchableOpacity onPress={() => navigation.navigate('PasswordForgot')}>
                  <Text style={styles.returnOtp}>Gửi lại mã</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    color: "black",
    textAlign: "center",
    fontSize: SIZES.h2,
  },
  returnOtp: {
    color: COLORS.green,
    fontSize: SIZES.h2,
    fontWeight: 600,
    paddingLeft: SIZES.base,
  },
});
