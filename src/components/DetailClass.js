import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../utils/theme";

import { useNavigation } from "@react-navigation/native";

const DetailClass = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.className}>Lớp - {data.class}</Text>
        <Text style={styles.class}>Thời gian: {data.time}</Text>
        <Text style={styles.class}>Giáo viên: {data.teacher}</Text>
        <Text style={styles.class}>Ngày học: {data.formated_date}</Text>
      </View>
      
    </View>
  );
};

export default DetailClass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    padding: 14,
  },
  buttons: {
    flexDirection: "row",
    gap: SIZES.padding
  },
  button: {
    width: "45%",
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
  },
});
