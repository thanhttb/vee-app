import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
// import Pdf from "react-native-pdf";


const VerticalHomeWork = ({ item ,setShow, show}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.component}>
      <View
        style={[
          styles.lesson,
          item.item == 1 && { backgroundColor: COLORS.green },
          item.item == 2 && { backgroundColor: COLORS.red },
          item.item == 3 && { backgroundColor: COLORS.blue },
        ]}
      ></View>

      <View style={styles.container}>
        <View style={{ width: "75%" }}>
          <Text style={styles.className}>Thứ 3, 03/03/2023</Text>
          <Text style={styles.class} numberOfLines={1} ellipsizeMode="tail">
            Ca 1: Luyện tập các bài tập hình học nâng cao trang 5
          </Text>
          <Text style={styles.class}>Giáo viên: Nguyễn Trung Tấn</Text>
        </View>
        <View
          style={{
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={()=> setShow(!show)}
          >
          
          <FontAwesome name="folder" size={28} color={`${COLORS.green}`} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VerticalHomeWork;

const styles = StyleSheet.create({
  component: {
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.spacing,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    display: "flex",
    flexDirection: "row",
    paddingVertical: SIZES.padding,
  },
  lesson: {
    width: "8%",
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
    width: "100%",
    paddingHorizontal: SIZES.spacing,
    flex: 1,
    flexDirection: "row",
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
    paddingTop: 4,
  },
});
