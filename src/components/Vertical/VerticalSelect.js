import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";

const VerticalSelect = ({ item, selectedItem }) => {
  const x = new Number(item.year);
  const isChecked = item.id === selectedItem.id;
  return (
    <View style={[, { justifyContent: "center", paddingLeft: 10 }]}>
      <Text
        style={
          ({ fontWeight: 700 },
          isChecked
            ? {
                color: COLORS.green,
              }
            : {})
        }
      >
        Lớp {item?.name}
      </Text>
      <Text
        style={[
          styles.customSelect,
          isChecked
            ? {
                color: COLORS.green,
              }
            : {},
        ]}
      >
        Học sinh:{" "}
        <Text style={[styles.customSelect, { fontWeight: 400 }]}>
          {item?.student_name}
        </Text>
      </Text>
      <Text
        style={[
          styles.customSelect,
          isChecked
            ? {
                color: COLORS.green,
              }
            : {},
        ]}
      >
        Năm học:{" "}
        <Text style={[styles.customSelect, { fontWeight: 400 }]}>
          {item?.year} - {x + 1}
        </Text>
      </Text>
    </View>
  );
};

export default VerticalSelect;

const styles = StyleSheet.create({
  customSelect: { fontSize: 13, fontWeight: 700, color: "#637381" },
});
