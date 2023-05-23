import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import ButtonAction from "./ButtonAction";

const LessonCalendar = ({ showDetailLesson, item, index }) => {
  const navigation = useNavigation();
  const goToA2 = () => {
    navigation.navigate("Trang chủ", {
      screen: "Tình hình học tập chi tiết",
      params: {
        id: 1,
        data: item.previous_session,
      },
    });
  };
  return (
    <View style={styles.component} key={index}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.className}>Lớp - {item?.class}</Text>
          <Text style={styles.class}>
            Thời gian: {item?.day} | {item?.time}
          </Text>
          <Text style={styles.class}>Giáo viên: {item?.teacher}</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <ButtonAction
              label={"Xin nghỉ"}
              color={COLORS.green}
              background={COLORS.white}
              onPress={() => {
                navigation.navigate("Đơn xin nghỉ", {
                  id: 1,
                });
              }}
            />
          </View>
          <View style={styles.button}>
            <ButtonAction
              label={"Xin học phụ đạo"}
              color={COLORS.green}
              background={COLORS.white}
              onPress={() => {
                navigation.navigate("Đơn học phụ đạo", {
                  id: 1,
                });
              }}
            />
          </View>

          <View style={styles.button}>
            <ButtonAction
              label={"Tài liệu buổi trước"}
              color={COLORS.white}
              background={COLORS.green}
              onPress={goToA2}
            />
          </View>
        </View>
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
    fontSize: SIZES.h3,
  },
  lessonNumber: {
    color: "black",
    fontWeight: 500,
    fontSize: SIZES.h14,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    width: "100%",
    elevation: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  content: {
    padding: SIZES.spacing,
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
    fontWeight: 500,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.spacing,
    paddingBottom: SIZES.spacing,
  },
  button: {
    width: "32%",
  },
});
