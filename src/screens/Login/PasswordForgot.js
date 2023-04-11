import React, {useRef} from "react";
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
import Recaptcha from 'react-native-recaptcha-that-works';
import ReCAPTCHA from 'react-google-recaptcha';
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
  const recaptcha = useRef();
  const [otp, setOtp] = React.useState(false);
  const [key, setKey] = React.useState();

  const onChangeCapcha = (value) => {
    console.log("Captcha value:", value);
    this.recaptcha?.current?.open();
  };

  const send = React.useCallback(() => {
    this.recaptcha?.current.open();
  }, []);

  const handleClosePress = React.useCallback(() => {
    this.recaptcha?.current.close();
  }, []);

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
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
              <View>
                <Recaptcha
                 ref={recaptcha}
                 headerComponent={<Button title="Close" onPress={handleClosePress} />}
          siteKey="6Le7-FciAAAAACnKxo3JECtz17LYl2VjJgC17ydG"
          baseUrl="http://127.0.0.1"
                  // onVerify={onChangeCapcha}
                  size="normal"
                  theme="light"
          onLoad={() => console.log('onLoad event')}
          onClose={() => console.log('onClose event')} 
          onError={(err) => {
            console.warn('error', err);
          }}
          onExpire={() => console.log('onExpire event')}
          onVerify={(token) => {
            setKey(token);
          }}
                />
                
              </View>
              <Spacer />
              <View style={styles.inputs}>
                <Button
                  onPress={send}
                  label={"Tiếp tục"}
                  color={COLORS.white}
                  background={COLORS.green}
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
                <OTPInput />
              </View>
              <View style={styles.inputs}>
                <Button
                  onPress={() => setOtp(false)}
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
