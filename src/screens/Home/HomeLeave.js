import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import DetailClass from "../../components/DetailClass";
import { COLORS, SIZES } from "../../utils/theme";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
const types = ["Check In", "Thông báo", "Câu hỏi"];
const HomeLeave = ({ route, navigation }) => {
  const { id } = route.params;
  const [type, setType] = useState(1);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ margin: 4 }}>
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
          <Spacer />
          <DetailClass />
          <Spacer />
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
          <TextInput
            style={styles.TextInput}
            placeholder={`Lý do nghỉ! (*)`}
            keyboardType={`default`}
            focusable={false}
            multiline={true}
            numberOfLines={4}
            // value={value}
            // onChangeText={text => setValue(text)}
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
