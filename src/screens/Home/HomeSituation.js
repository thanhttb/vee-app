import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, FlatList } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
//utils
import { COLORS, SIZES } from "../../utils/theme";
//components
import VerticalHomeSituation from "../../components/VerticalHomeSituation";

const types = [
  "Lớp TC9.1 - Năm học 2023-2024",
  "Lớp TC9.2 - Năm học 2023-2024",
  "Lớp TC9.3 - Năm học 2023-2024",
];
const HomeSituation = () => {
  const [type, setType] = useState(1);
  const data = [1, 1, 2, 3];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
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

        <View style={styles.buttons}>
          <View
            style={{
              backgroundColor: COLORS.green,
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={styles.textButton}>Chính khóa</Text>
          </View>
          <View
            style={{ backgroundColor: COLORS.blue, borderRadius: SIZES.radius }}
          >
            <Text style={styles.textButton}>Phụ đạo</Text>
          </View>
          <View
            style={{ backgroundColor: COLORS.red, borderRadius: SIZES.radius }}
          >
            <Text style={styles.textButton}>Kiểm tra định kỳ</Text>
          </View>
        </View>

        
      </View>
      <View style={styles.components}>
          <FlatList
            style={{ padding: SIZES.padding}}
            data={data}
            renderItem={(item) => <VerticalHomeSituation item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
    </View>
  );
};

export default HomeSituation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: SIZES.padding,
  },
  select: {
    width: "100%",
    borderRadius: SIZES.base,
    height: 56,
    marginTop: SIZES.padding,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 0.7,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.padding,
  },
  textButton: { color: "white", paddingHorizontal: 20, paddingVertical: 10 },
  components: {flex: 1}
});
