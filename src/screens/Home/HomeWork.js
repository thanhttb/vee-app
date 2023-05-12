import React, { useState } from "react";
import { View, StyleSheet, StatusBar, FlatList } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import PDFReader from "rn-pdf-reader-js";
//utils
import { COLORS, SIZES } from "../../utils/theme";
//components
import VerticalHomeWork from "../../components/VerticalHomeWork";

const types = [
  "Lớp TC9.1 - Năm học 2023-2024",
  "Lớp TC9.2 - Năm học 2023-2024",
  "Lớp TC9.3 - Năm học 2023-2024",
];

const HomeWork = () => {
  const [type, setType] = useState(1);
  const [show, setShow] = useState(false);
  const data = [1, 1, 2, 3];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      {show == false && (
        <>
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
          </View>
          <FlatList
            style={{ marginTop: SIZES.spacing }}
            data={data}
            renderItem={(item) => (
              <VerticalHomeWork item={item} setShow={setShow} show={show}/>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {show && (
        <PDFReader
          style={{ flex: 1 }}
          source={{
            uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
          }}
        />
      )}
    </View>
  );
};

export default HomeWork;

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
    // marginHorizontal: SIZES.padding,
  },
});
