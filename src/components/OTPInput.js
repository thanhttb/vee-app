import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
//npm
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { COLORS } from "../utils/theme";
const OTPInput = () => {
  const [otp, setOtp] = useState("");
  return (
    <OTPInputView
      style={{ width: "80%", height: 200, alignItems: "center" }}
      pinCount={4}
      // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
      onCodeChanged={(code) => setOtp(code)}
      autoFocusOnLoad={false}
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled={(code) => {
        console.log(`Code is ${code}, you are good to go!`);
      }}
    />
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: COLORS.gray,
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 1,
    color: COLORS.green,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.gray,
  },
});
