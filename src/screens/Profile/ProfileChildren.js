import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";
import DatePicker from "react-native-datepicker";
import moment from "moment";

// import DatePicker from 'react-native-date-picker'
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
import axios from "axios";
import ButtonC from "../../components/Button";
import Spacer from "../../components/Spacer";
import { Alert } from "react-native";
//components

const ProfileChildren = () => {
  const navigation = useNavigation();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [students, setStudents] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    axios
      .post(
        BASE_URL + "profile",
        {
          parent_id: user.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        let s = response.data.students.map((st) => {
          st.dob = new Date(st.dob);
          return st;
        });
        setStudents(s);
      })
      .catch((err) => {});
  }, []);

  function onStudentChange(e, key, name) {
    let s = [...students];
    if (e) {
      s[key][name] = e;
    }
    setStudents(s);
  }

  const onGenderChange = (value, key) => {
    let s = [...students];
    s[key].gender = value;
    setStudents(s);
  };

  const handleChangeSubmit = async (key) => {
    let student = students[key];
    axios
      .post(
        BASE_URL + "profile/student",
        { id: user?.id, student: student },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => console.log("res"))
      .then((res) =>
        Alert.alert(
          "VietElite",
          "Cập nhập thông tin thành công",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          {
            userInterfaceStyle: "light",
          }
        )
      )
      .catch((err) =>
        Alert.alert(
          "VietElite",
          "Cập nhập thông tin thất bại",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          {
            userInterfaceStyle: "light",
          }
        )
      );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, key, name) => {
    let s = [...students];
    if (date) {
      s[key][name] = date;
    }
    setStudents(s);
    hideDatePicker();
  };

  return (
    <>
      <GestureHandlerRootView style={styles.safeview}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ backgroundColor: COLORS.white }}>
                <StatusBar barStyle="light-content" />
                {students.map((s, key) => {
                  return (
                    <View style={styles.container} key={key}>
                      <Text style={styles.info}>
                        Hồ sơ học sinh {s?.fullname} {key}
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={s?.fullname}
                        onChangeText={(e) =>
                          onStudentChange(e, key, "fullname")
                        }
                        label="Họ tên học sinh"
                        mode="outlined"
                        outlineStyle={{ borderWidth: 1 }}
                        outlineColor={COLORS.input}
                        activeOutlineColor={COLORS.input}
                        dense={true}
                        // contentStyle={{backgroundColor: 'red', padding: 2}}
                      />
                      <Spacer height={4} />
                      <View style={styles.date}>
                        <TextInput
                          style={styles.input}
                          // style={{ width: "85%" }}
                          label="Ngày sinh"
                          mode="outlined"
                          outlineStyle={{ borderWidth: 1 }}
                          outlineColor={COLORS.input}
                          activeOutlineColor={COLORS.input}
                          dense={true}
                          value={moment(s?.dob).format("L")}
                          // value={s?.dob}
                          onPressIn={showDatePicker}
                          onChangeText={(date) => {
                            handleConfirm(date, key, "dob");
                          }}
                        />
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={(date) => {
                            handleConfirm(date, key, "dob");
                          }}
                          onCancel={hideDatePicker}
                        />
                      </View>
                     
                      <Spacer height={12} />
                      <View>
                        <Text>Giới tính</Text>
                        <View style={styles.wrapper}>
                          {["Nam", "Nữ"].map((feeling) => (
                            <View key={feeling} style={styles.mood}>
                              <Text style={styles.gender}>{feeling}</Text>
                              <TouchableOpacity
                                style={styles.outter}
                                onPress={(e) => onGenderChange(feeling, key)}
                              >
                                {s.gender == feeling && (
                                  <View style={styles.inner}></View>
                                )}
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </View>
                      <Spacer height={12} />
                      <TextInput
                        style={styles.input}
                        label="Trường học"
                        value={s?.school}
                        onChangeText={(e) => onStudentChange(e, key, "school")}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 1 }}
                        outlineColor={COLORS.input}
                        activeOutlineColor={COLORS.input}
                      />
                      <TextInput
                        style={styles.input}
                        label="Nguyện vọng"
                        value={s?.aspiration}
                        onChangeText={(e) =>
                          onStudentChange(e, key, "aspiration")
                        }
                        mode="outlined"
                        outlineStyle={{ borderWidth: 1 }}
                        outlineColor={COLORS.input}
                        activeOutlineColor={COLORS.input}
                      />
                      <Spacer />
                      <ButtonC
                        onPress={() => handleChangeSubmit(key)}
                        label={"Lưu thông tin học sinh"}
                        color={COLORS.white}
                        background={COLORS.green}
                      />
                      <Spacer height={20} />
                      <View style={styles.dotline}></View>
                    </View>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </>
  );
};

export default ProfileChildren;

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
    marginTop: 2,
    borderColor: COLORS.input,
    backgroundColor: "white",
    marginBottom: SIZES.spacing,
    fontSize: 15,
  },
  text: {
    textAlign: "left",
    paddingBottom: SIZES.base,
  },
  datePickerStyle: {
    width: SIZES.width - 40,
  },

  mood: {
    marginHorizontal: 15,
    flexDirection: "row",
  },
  gender: {
    paddingRight: 4,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dotline: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    color: COLORS.gray,
  },
});
