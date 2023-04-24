import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";

const LessonCalendar = ({showDetailLesson}) => {
  return (
    <View style={styles.component}>
      <View style={styles.lesson}>
       <View style={{
         display: "flex",
         height: 40,
         width: 40,
         justifyContent: "center",
         alignContent: "center",
         alignItems: "center",
         backgroundColor: COLORS.lesson,
         borderRadius: 50
       }}>
       <Text style={styles.lessonText}>
          Ca <Text style={styles.lessonNumber}>1</Text>
        </Text>
       </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={showDetailLesson}>
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
    fontSize: SIZES.h14,
  },
  lessonNumber: {
    color: "black",
    fontWeight: 500,
    fontSize: SIZES.h14,
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
