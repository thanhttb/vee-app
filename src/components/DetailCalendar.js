import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import Button from "./Button";

import { useNavigation } from "@react-navigation/native";

const DetailCalendar = ({showDetailLesson}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.className}>Lớp - TC9.1</Text>
        <Text style={styles.class}>Thời gian: 8:00 - 9:00</Text>
        <Text style={styles.class}>Giáo viên: Nguyễn Trung Tấn</Text>
        <Text style={styles.class}>Thứ 3: 04/04/2023</Text>
      </View>
      <View style={[styles.content, styles.buttons]}>
        <View style={styles.button}>
          <Button
            label={"Xin nghỉ"}
            color={COLORS.green}
            background={COLORS.white}
            onPress={()=>
             {
              navigation.navigate('Đơn xin nghỉ', {
                id: 1
              });
              showDetailLesson()
             }}
          />
        </View>
        <View style={styles.button}>
          <Button
            label={"Xin học phụ đạo"}
            color={COLORS.green}
            background={COLORS.white}
            onPress={()=>
              {
                navigation.navigate('Đơn học phụ đạo', {
                  id: 1
                });
                showDetailLesson()
              }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailCalendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  content: {
    padding: 14,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between'
    // gap: SIZES.padding
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
