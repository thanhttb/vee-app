import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import ButtonAction from "../Button/ButtonAction";
import moment from "moment";

const LessonCalendar = ({ showDetailLesson, item, index }) => {
  const navigation = useNavigation();
  const goToA2 = () => {
    navigation.navigate("Trang chủ", {
      screen: "Tình hình học tập chi tiết",
      initial: false,
      params: {
        data: item?.previous_session,
      },
    });
  };

  const formattedDate = moment(item?.formated_date, "DD/MM/YYYY").format(
    "DD-MM-YYYY"
  );
  return (
    <View
      style={[styles.component, index == 0 && { marginTop: SIZES.padding }]}
      key={index}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.className}>Lớp - {item?.class}</Text>
            {item?.type == "exam" && (
              <View
                style={[
                  styles.typeTag,
                  {
                    backgroundColor: COLORS.red,
                  },
                ]}
              >
                <Text style={styles.note}>Kiểm tra định kỳ</Text>
              </View>
            )}
            {item?.type == "main" && (
              <View
                style={[
                  styles.typeTag,
                  {
                    backgroundColor: COLORS.green,
                  },
                ]}
              >
                <Text style={styles.note}>Chính khóa</Text>
              </View>
            )}
            {item?.type == "tutor" && (
              <View
                style={[
                  styles.typeTag,
                  {
                    backgroundColor: COLORS.blue,
                  },
                ]}
              >
                <Text style={styles.note}>Phụ đạo</Text>
              </View>
            )}
          </View>

          <Text style={styles.class}>
            Thời gian: {item?.time} | {formattedDate}
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
                  data: item,
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
                  data: item,
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
    marginHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
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
  typeTag: {
    borderRadius: SIZES.radius,
    marginLeft: SIZES.base,
    marginBottom: 2,
  },
  note: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 10,
  },
});
