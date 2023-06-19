import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
//npm
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { COLORS } from "../utils/theme";

import axios from "axios";
import { BASE_URL } from "../../config";

const OTPInput = ({ otpInput, setOtpInput }) => {
  // const [otp, setOtp] = useState("");
 

  return (
    <OTPInputView
      style={{ width: "80%", height: 200, alignItems: "center" }}
      pinCount={4}
      onCodeChanged={(code) => setOtpInput(code)}
      autoFocusOnLoad={false}
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      // onCodeFilled={() => verifyOtp}
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
