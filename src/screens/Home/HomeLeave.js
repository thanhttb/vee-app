import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
//npm
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
//redux
import { userList } from "../../redux/actions/userActions";
import { Provider, useDispatch, useSelector } from "react-redux";
//component
import DetailClass from "../../components/DetailClass";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import { COLORS, SIZES } from "../../utils/theme";

const types = ["Check In", "Thông báo", "Câu hỏi"];
const HomeLeave = ({ route, navigation }) => {
  const { id } = route.params;
  const [type, setType] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { users } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(userList(user.id));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ margin: 4 }}>
          {/* Select children  */}
          <SelectDropdown
            data={users}
            buttonStyle={styles.select}
            dropdownStyle={{
              borderRadius: 8,
            }}
            buttonTextStyle={styles.customText}
            defaultButtonText={"Chọn học sinh"}
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
              return selectedItem.fullname;
            }}
            rowTextForSelection={(item, index) => {
              return item.fullname;
            }}
          />
          <Spacer />
          {/* Lịch học  */}
          <DetailClass />
          <Spacer />
          {/* Select lý do  */}
          <SelectDropdown
            data={types}
            buttonStyle={styles.select}
            dropdownStyle={{
              borderRadius: 8,
            }}
            defaultButtonText={"Chọn lý do nghỉ..."}
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
          <Spacer />
          {/* Lý do chi tiết  */}
          <TextInput
            style={styles.TextInput}
            placeholder={`Lý do nghỉ! (*)`}
            keyboardType={`default`}
            focusable={false}
            multiline={true}
            numberOfLines={4}
            secureTextEntry={false}
          />
          <Spacer />
          <Button
            // onPress={() => handleChangeSubmit(key)}
            label={"Gửi"}
            color={COLORS.white}
            background={COLORS.green}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeLeave;

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
    height: 100,
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
});
