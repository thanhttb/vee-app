import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";

const VerticalHomeWork = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Bài tập về nhà chi tiết", {
          id: 1,
        })
      }
    >
      <View style={styles.component}>
        <View style={styles.lesson}>
          <Text style={styles.lessonText}>1</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.className}>Lớp - TC9.1</Text>
          <Text style={styles.class}>Thời gian: 8:00 - 9:00</Text>
          <Text style={styles.class}>Giáo viên: Nguyễn Trung Tấn</Text>
        </View>

        <View style={styles.date}>
          <Text style={styles.class}>Thứ 3, 03/03/2023</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalHomeWork;

const styles = StyleSheet.create({
  component: {
    marginTop: SIZES.padding,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    display: "flex",
    flexDirection: "row",
    paddingVertical: SIZES.padding,
  },
  lesson: {
    width: "8%",
    backgroundColor: "#D9D9D9",
    height: 16,
    paddingLeft: "4%",
    borderTopRightRadius: SIZES.spacing,
    borderBottomRightRadius: SIZES.spacing,
  },
  lessonText: {
    color: COLORS.gray,
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  container: {
    borderRadius: SIZES.radius,
    width: "50%",
    marginLeft: SIZES.spacing,
  },
  date: {
    width: "40%",
  },
  content: {
    padding: 14,
  },
  className: {
    fontWeight: 600,
    fontSize: SIZES.h14,
  },
  class: {
    fontSize: SIZES.h14,
    color: COLORS.gray,
    paddingVertical: 2,
  },
});
