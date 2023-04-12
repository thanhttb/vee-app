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
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";
import DatePicker from "react-native-datepicker";

// import DatePicker from 'react-native-date-picker'
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
import axios from "axios";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import { Alert } from "react-native";
//components

const ProfileChildren = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [students, setStudents] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const FadeIn = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

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

  return (
    <>
      <GestureHandlerRootView style={styles.safeview}>
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <StatusBar barStyle="light-content" />
                {students.map((s, key) => {
                  return (
                    <View style={styles.container} key={key}>
                      <Text style={styles.info}>
                        Hồ sơ học sinh {s?.fullname}
                      </Text>
                      <TextInput
                        style={styles.input}
                        label="Họ tên học sinh"
                        value={s?.fullname}
                        onChangeText={(e) =>
                          onStudentChange(e, key, "fullname")
                        }
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                        outlineColor={COLORS.input}
                        activeOutlineColor={COLORS.input}
                        dense={true}
                        // contentStyle={{backgroundColor: 'red', padding: 2}}
                      />
                      <Spacer height={4} />
                      <Text style={styles.text}>Ngày sinh</Text>
                      <Animated.View style={[styles.animted, FadeIn]}>
                        <DatePicker
                          style={styles.datePickerStyle}
                          date={s?.dob}
                          mode="date"
                          placeholder="Ngày sinh"
                          label="Ngày sinh"
                          format="DD/MM/YYYY"
                          minDate="01-01-1900"
                          maxDate="01-01-2100"
                          confirmBtnText="Xác nhận"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: "absolute",
                              right: -5,
                              top: 4,
                              marginLeft: 0,
                            },
                            dateInput: {
                              borderColor: "gray",
                              alignItems: "flex-start",
                              height: 50,
                              borderColor: COLORS.input,
                              backgroundColor: "white",
                              borderRadius: 4,
                            },
                            placeholderText: {
                              fontSize: 17,
                              color: "gray",
                            },
                            dateText: {
                              fontSize: 15,
                              marginLeft: 16,
                            },
                          }}
                          onDateChange={(date) => {
                            onStudentChange(date, key, "dob");
                          }}
                        />
                      </Animated.View>
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
                        outlineStyle={{ borderWidth: 0.5 }}
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
                        outlineStyle={{ borderWidth: 0.5 }}
                        outlineColor={COLORS.input}
                        activeOutlineColor={COLORS.input}
                      />
                      <Spacer />
                      <Button
                        onPress={() => handleChangeSubmit(key)}
                        label={"Lưu thông tin học sinh"}
                        color={COLORS.white}
                        background={COLORS.green}
                      />
                      <Spacer height={20} />
                      <View
                        style={styles.dotline}
                      ></View>
                    </View>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
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
    color: COLORS.gray
  }
});
