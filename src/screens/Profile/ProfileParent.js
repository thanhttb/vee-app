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
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import { Alert } from "react-native";
//components
const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
const ProfileParent = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [parent, setParent] = React.useState({
    fullname: user.fullname ? user.fullname : "",
    alt_fullname: user.alt_fullname ? user.alt_fullname : "",
    phone: user.phone ? user.phone : "",
    email: user.email ? user.email : "",
    alt_phone: user.alt_phone ? user.alt_phone : "",
    alt_email: user.alt_email ? user.alt_email : "",
  });

  const handleParentSubmit = async () => {
    axios
      .post(
        BASE_URL + "profile/parent",
        { id: user?.id, parent: parent },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => console.log("res"))
      .then((res) =>  Alert.alert('VietElite', 'Cập nhập thông tin cá nhân thành công', [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],{
        userInterfaceStyle: "light"
      }))
      .catch((err) =>  Alert.alert('VietElite', 'Cập nhập thông tin cá nhân thất bại', [
       
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],{
        userInterfaceStyle: "light"
      }));
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
                <Text style={styles.info}>Thông tin bố/mẹ</Text>
                <TextInput
                  style={styles.input}
                  label="Họ tên bố/mẹ"
                  value={parent?.fullname}
                  onChangeText={(text) =>
                    setParent({ ...parent, fullname: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                />
                <TextInput
                  style={styles.input}
                  label="Email"
                  value={parent?.email}
                  onChangeText={(text) => setParent({ ...parent, email: text })}
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                />
                <TextInput
                  style={styles.input}
                  label="Số điện thoại"
                  value={parent?.phone}
                  onChangeText={(text) => setParent({ ...parent, phone: text })}
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                />
                <Spacer />
                <Text style={styles.info}>Thông tin mẹ/bố</Text>
                <TextInput
                  style={styles.input}
                  label="Họ tên mẹ/bố"
                  value={parent?.alt_fullname}
                  onChangeText={(text) =>
                    setParent({ ...parent, alt_fullname: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                />
                <TextInput
                  style={styles.input}
                  label="Email"
                  value={parent?.alt_email}
                  onChangeText={(text) =>
                    setParent({ ...parent, alt_email: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                />
                <TextInput
                  style={styles.input}
                  label="Số điện thoại"
                  value={parent?.alt_phone}
                  onChangeText={(text) =>
                    setParent({ ...parent, alt_phone: text })
                  }
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  outlineColor={COLORS.input}
                  activeOutlineColor={COLORS.input}
                />
                <Spacer />
                <Button
                  onPress={handleParentSubmit}
                  label={"Lưu thông tin phụ huynh"}
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

export default ProfileParent;

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
