import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//redux
import { userList } from "../../redux/actions/userActions";
import { listClass } from "../../redux/actions/classActions";
import { Provider, useDispatch, useSelector } from "react-redux";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button/Button";
import { COLORS, SIZES } from "../../utils/theme";
import axios from "axios";
import { BASE_URL } from "../../../config";

const ScheduleTutoring = ({ route, navigation }) => {
  const { data } = route.params;
  const [description, setDescription] = useState("");
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(data.formated_date);
  const [selectedTime, setSelectedTime] = useState(formattedTime);

  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { users } = useSelector((state) => state.userReducer);

  const [selectedItem, setSelectItem] = useState(
    users?.length > 0 ? users[0].id : -1
  );

  const formattedDate = moment(data.formated_date, "DD/MM/YYYY").format(
    "DD-MM-YYYY"
  );

  const dataTime = data.time.split(" - ")[0];
  var parts = dataTime.split(":");
  var hours = parseInt(parts[0]);
  var minutes = parseInt(parts[1]);

  var date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setMinutes(date.getMinutes() - 30);

  var formattedTime =
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

 
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(moment(date).format("L"));
    hideDatePicker();
  };

  const handleTimeConfirm = (date) => {
    setSelectedTime(moment(date).format("LT"));
    hideTimePicker();
  };

  useEffect(() => {
    dispatch(listClass(user?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(userList(user.id));
  }, [dispatch]);

  useEffect(() => {
    setSelectedTime(formattedTime)
  },[formattedTime])

  const handleChangeSubmit = () => {
    if (description == "") {
      Alert.alert(
        "VietElite",
        "Chưa điền lý do xin học phụ đạo",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        {
          userInterfaceStyle: "light",
        }
      );
    } else {
      axios
        .post(
          BASE_URL + "feed/create",
          {
            session_id: data.sid,
            content: `Xin học phụ đạo tăng cường ${selectedTime} ${data.date}`,
            parent_id: selectedItem,
            class_id: data.class_id,
            type: 3,
            description: description,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + authToken,
            },
          }
        )
        .then((res) => {
          Alert.alert(
            "VietElite",
            "Gửi đơn xin học phụ đạo thành công",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            {
              userInterfaceStyle: "light",
            }
          ),
            setDescription(""),
            setSelectedTime(dataTime)
        })
        .catch((err) => {
          Alert.alert(
            "VietElite",
            "Gửi đơn xin học phụ đạo thất bại",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            {
              userInterfaceStyle: "light",
            }
          );
        });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ margin: 12 }}>
              <SelectDropdown
                data={users}
                buttonStyle={styles.select}
                dropdownStyle={{
                  borderRadius: 8,
                }}
                buttonTextStyle={styles.customText}
                defaultButtonText={"Chọn học sinh"}
                defaultValue={users[0]}
                onSelect={(selectedItem, index) => {
                  setSelectItem(selectedItem.id);
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#637381"}
                      size={14}
                      style={{ marginRight: 10 }}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.fullname;
                }}
                rowTextForSelection={(item, index) => {
                  return item.fullname;
                }}
              />
              <Spacer height={10} />
              <View style={styles.datetime}>
                <View style={styles.time}>
                  <Text style={styles.text}>Giờ học</Text>

                  <View style={[styles.input, styles.inputPassword]}>
                    <TextInput
                      style={{ width: "85%" }}
                      placeholder={"Chọn giờ học"}
                      placeholderTextColor={COLORS.input}
                      value={selectedTime}
                      onPressIn={showTimePicker}
                    />
                    <TouchableOpacity
                      style={{ height: "100%", aspectRatio: 1 }}
                      onPress={showTimePicker}
                    >
                      <Image
                        source={require("../../../assets/icon-home/clock.jpg")}
                        style={styles.bellIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                  />
                </View>
                <View style={styles.date}>
                  <Text style={styles.text}>Ngày học</Text>
                  <View style={[styles.input, styles.inputPassword]}>
                    <TextInput
                      style={{ width: "85%" }}
                      editable={false}
                      selectTextOnFocus={false}
                      placeholder={"Chọn ngày học"}
                      placeholderTextColor={COLORS.input}
                      value={selectedDate}
                    />
                    <TouchableOpacity
                      style={{ height: "100%", aspectRatio: 1 }}
                    >
                      <Image
                        source={require("../../../assets/icon-home/date.jpg")}
                        style={styles.bellIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              </View>
              <Spacer height={10} />
              <View style={styles.contentClass}>
                <Text style={styles.className}>Lớp - {data?.class}</Text>
                <Text style={styles.class}>
                  Thời gian: {data?.time} | {formattedDate}
                </Text>
                <Text style={styles.class}>Giáo viên: {data?.teacher}</Text>
              </View>

              <Spacer height={10} />
              <TextInput
                style={styles.TextInput}
                placeholder={`Lý do xin học phụ đạo (*)`}
                keyboardType={`default`}
                focusable={false}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => setDescription(text)}
                secureTextEntry={false}
              />
              <Spacer height={30} />
              <Button
                onPress={handleChangeSubmit}
                label={"Gửi"}
                color={COLORS.white}
                background={COLORS.green}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ScheduleTutoring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    margin: SIZES.base,
  },
  select: {
    width: SIZES.width - 25,
    borderRadius: SIZES.base,
    height: 56,
    marginTop: 2,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 1,
  },
  TextInput: {
    height: 120,
    borderWidth: 1,
    padding: 10,
    borderRadius: SIZES.base,
    textAlignVertical: "center",
    borderColor: COLORS.input,
  },
  customText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: 400,
    textAlign: "left",
  },
  datetime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerStyle: {
    width: (SIZES.width - 40) / 2,
    marginTop: 10,
  },
  bellIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  input: {
    flexDirection: "row",
    borderRadius: SIZES.base,
    height: SIZES.spacing * 5,
    borderWidth: 1,
    padding: SIZES.spacing,
    borderColor: COLORS.input,
    width: (SIZES.width - 40) / 2,
    marginTop: 4,
  },
  inputPassword: {
    justifyContent: "space-between",
  },

  contentClass: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    width: "100%",
    elevation: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  className: {
    fontWeight: "bold",
    fontSize: SIZES.h14,
    paddingVertical: 2,
  },
  class: {
    fontSize: SIZES.h14,
    color: COLORS.gray,
    paddingVertical: 2,
    fontWeight: 500,
  },
});
