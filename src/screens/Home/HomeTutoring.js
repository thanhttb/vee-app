import React, { useState } from "react";
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
  Image
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import { COLORS, SIZES } from "../../utils/theme";

const types = ["Check In", "Thông báo", "Câu hỏi"];
const HomeTutoring = ({ route, navigation }) => {
  const { id } = route.params;
  const [type, setType] = useState(1);
  const fadeAnim = new Animated.Value(0);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

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
                data={types}
                buttonStyle={styles.select}
                dropdownStyle={{
                  borderRadius: 8,
                }}
                buttonTextStyle={styles.customText}
                defaultValue={types[0]}
                onSelect={(selectedItem, index) => {
                  setType(index + 1);
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
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
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
                      //   secureTextEntry={showPassword}
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
                    minuteInterval={30}
                  />
                </View>
                <View style={styles.date}>
                  <Text style={styles.text}>Ngày học</Text>
                  <View style={[styles.input, styles.inputPassword]}>
                    <TextInput
                      style={{ width: "85%" }}
                      placeholder={"Chọn ngày học"}
                      placeholderTextColor={COLORS.input}
                      //   secureTextEntry={showPassword}
                      value={selectedDate}
                      onPressIn={showDatePicker}
                    />
                    <TouchableOpacity
                      style={{ height: "100%", aspectRatio: 1 }}
                      onPress={showDatePicker}
                    >
                      {/* <Ionicons name={"calendar"} size={24} color={"red"} /> */}
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
              <SelectDropdown
                data={types}
                buttonStyle={styles.select}
                dropdownStyle={{
                  borderRadius: 8,
                }}
                defaultButtonText={"Chọn lớp học"}
                buttonTextStyle={styles.customText}
                // defaultValue={types[0]}
                onSelect={(selectedItem, index) => {
                  setType(index + 1);
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
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />

              <Spacer height={10} />
              <TextInput
                style={styles.TextInput}
                placeholder={`Lý do xin học phụ đạo`}
                keyboardType={`default`}
                focusable={false}
                multiline={true}
                numberOfLines={4}
                // value={value}
                // onChangeText={text => setValue(text)}
                secureTextEntry={false}
              />
              <Spacer height={30} />
              <Button
                // onPress={() => handleChangeSubmit(key)}
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

export default HomeTutoring;

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
    backgroundColor: 'red'
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
});
