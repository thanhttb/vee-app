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
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
import axios from "axios";
import { Alert } from "react-native";
//redux
import { userList } from "../../redux/actions/userActions";
//components
import ButtonC from "../../components/Button/Button";
import Spacer from "../../components/Spacer";

const ProfileChildren = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, authToken } = useSelector((state) => state.authReducer);

  const [image, setImage] = useState([]);
  const [showkey, setShowKey] = useState();
  const [showImage, setShowImage] = React.useState(false);

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    dispatch(userList(user.id));
  }, [dispatch]);

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

  const onHandleChangeImage = async (e, key, name) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setShowImage(true);
      setShowKey(key)
      setImage(result.assets[0]);
    }
  };

  const onGenderChange = (value, key) => {
    let s = [...students];
    s[key].gender = value;
    setStudents(s);
  };

  const handleChangeSubmit = async (key) => {
    let student = students[key];
    if (image) {
      let formData = new FormData();
      let file;
      showImage == true &&
        (file = {
          uri:
            Platform.OS === "android"
              ? image?.uri
              : image?.uri?.replace("file://", ""),
          name:
            image?.fileName ||
            Math.floor(Math.random() * Math.floor(999999999)) + ".jpg",
          type: image?.type || "image/jpeg",
        });

      formData.append("id", user?.id);
      formData.append("student", JSON.stringify(student));
      showImage == true && formData.append("avatar", file);
      if (formData) {
        axios
          .post(BASE_URL + "profile/student", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + authToken,
            },
          })
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
              [{ text: "OK", onPress: () => console.log(err) }],
              {
                userInterfaceStyle: "light",
              }
            )
          );
      }
    } else {
      Alert.alert(
        "VietElite",
        "Chưa chọn ảnh đại diện cho con",
        [{ text: "OK", onPress: () => console.log(err) }],
        {
          userInterfaceStyle: "light",
        }
      );
    }
  };

  const showDatePicker = (index) => {
    setDatePickerVisibility(true);
    setSelected(index);
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
        {/* <KeyboardAwaareScrollView enableOnAndroid={true}> */}
        <KeyboardAvoidingView
          style={{ flexGrow: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 64}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flexGrow: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: COLORS.white }}>
                  <StatusBar barStyle="light-content" />
                  {students.map((s, index) => {
                    return (
                      <View style={styles.container} key={index}>
                        <Text style={styles.info}>
                          Hồ sơ học sinh {s?.fullname}
                        </Text>
                        <View style={{ marginBottom: 10 }}>
                          <Text>Ảnh đại diện</Text>
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {showImage == true && showkey == index ? (
                              <Image
                                style={styles.avatar}
                                source={{ uri: `${image?.uri}` }}
                              />
                            ) : (
                              <Image
                                style={styles.avatar}
                                source={{ uri: `${s?.avatar}` }}
                              />
                            )}

                            <TouchableOpacity
                              onPress={(e) =>
                                onHandleChangeImage(e, index, "avatar")
                              }
                            >
                              <View
                                style={{
                                  marginTop: 10,
                                  backgroundColor: "#eeeeee",
                                  padding: 4,
                                  borderRadius: 4,
                                }}
                              >
                                <Text style={{ fontSize: 12 }}>
                                  Thay ảnh đại diện
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <TextInput
                          style={styles.input}
                          value={s?.fullname}
                          onChangeText={(e) =>
                            onStudentChange(e, index, "fullname")
                          }
                          label="Họ tên học sinh"
                          mode="outlined"
                          outlineStyle={{ borderWidth: 1 }}
                          outlineColor={COLORS.input}
                          activeOutlineColor={COLORS.input}
                          dense={false}
                        />
                        <Spacer height={4} />
                        <View style={styles.date}>
                          <TextInput
                            style={styles.input}
                            label="Ngày sinh"
                            mode="outlined"
                            outlineStyle={{ borderWidth: 1 }}
                            outlineColor={COLORS.input}
                            activeOutlineColor={COLORS.input}
                            dense={false}
                            value={moment(s?.dob).format("L")}
                            onPressIn={() => showDatePicker(index)}
                            right={
                              <TextInput.Icon
                                icon={() => (
                                  <MaterialIcons
                                    name="date-range"
                                    size={24}
                                    color="#5b5b5b"
                                    onPress={() => showDatePicker(index)}
                                  />
                                )}
                              />
                            }
                          />
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                              handleConfirm(date, selected, "dob");
                            }}
                            onCancel={hideDatePicker}
                            maximumDate={new Date()}
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
                                  onPress={(e) =>
                                    onGenderChange(feeling, index)
                                  }
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
                          onChangeText={(e) =>
                            onStudentChange(e, index, "school")
                          }
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
                            onStudentChange(e, index, "aspiration")
                          }
                          mode="outlined"
                          outlineStyle={{ borderWidth: 1 }}
                          outlineColor={COLORS.input}
                          activeOutlineColor={COLORS.input}
                        />
                        <Spacer />
                        <ButtonC
                          onPress={() => handleChangeSubmit(index)}
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
          </View>
        </KeyboardAvoidingView>
        {/* </KeyboardAwaareScrollView> */}
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
    borderColor: COLORS.input,
    backgroundColor: "white",
    marginBottom: SIZES.spacing,
    width: "100%",
  },
  text: {
    textAlign: "left",
    // paddingBottom: SIZES.base,
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
  bellIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 16,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});
