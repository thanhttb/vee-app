import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import Button from "./Button";

import { useNavigation } from "@react-navigation/native";

const DetailCalendar = ({showDetailLesson, selectedSession}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.className}>Lớp - {selectedSession?.class}</Text>
        <Text style={styles.class}>Thời gian: {selectedSession?.time}</Text>
        <Text style={styles.class}>Giáo viên: {selectedSession?.teacher}</Text>
        <Text style={styles.class}>{selectedSession?.day}: {selectedSession?.formated_date}</Text>
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
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    padding: 14,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between'
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
