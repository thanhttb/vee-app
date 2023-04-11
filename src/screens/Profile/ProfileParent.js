import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
//utils
import { COLORS, SIZES } from "../../utils/theme";
//components

const ProfileParent = () => {
  const [text, setText] = React.useState("");
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            <Text style={styles.info}>Thông tin của bố</Text>
            <TextInput
              style={styles.input}
              label="Họ tên bố"
              value={text}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineStyle= {{borderWidth: 0.5}}
              outlineColor={COLORS.gray}
            />
           
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfileParent;

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  info: { fontSize: SIZES.h2, fontWeight: 500, paddingBottom: SIZES.spacing, color: COLORS.gray },
  input: {
    height: 50,
    borderColor: COLORS.gray,
    backgroundColor: "white",
    marginBottom: SIZES.spacing
  },
});
