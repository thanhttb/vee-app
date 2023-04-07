import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";

const LessonCalendar = () => {
  return (
    <View style={styles.component}>
      <View style={styles.lesson}>
        <Text style={styles.lessonText}>
          Ca <Text style={styles.lessonNumber}>1</Text>
        </Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.className}>Lớp - TC9.1</Text>
            <Text style={styles.class}>Thời gian: 8:00 - 9:00</Text>
            <Text style={styles.class}>Giáo viên: Nguyễn Trung Tấn</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LessonCalendar;

const styles = StyleSheet.create({
  component: {
    flexDirection: "row",
    alignItems: "center",
  },
  lesson: {
    width: "15%",
  },
  lessonText: {
    color: COLORS.gray,
    fontSize: SIZES.h2,
  },
  lessonNumber: {
    color: "black",
    fontWeight: 600,
    fontSize: SIZES.h2,
  },
  container: {
    backgroundColor: COLORS.lesson,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    width: "85%",
  },
  content: {
    padding: 14,
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
