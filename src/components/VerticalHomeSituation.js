import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const VerticalHomeSituation = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.component}>
      <View style={styles.containerTop}>
        <View style={{ width: "75%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.className}>{item.item?.date}</Text>
            {item.item.type == "exam" ? (
              <View
                style={{
                  backgroundColor: COLORS.red,
                  borderRadius: SIZES.radius,
                  marginLeft: SIZES.base,
                }}
              >
                <Text style={styles.note}>Kiểm tra định kỳ</Text>
              </View>
            ) : item.item.type == "main" ? (
              <View
                style={{
                  backgroundColor: COLORS.green,
                  borderRadius: SIZES.radius,
                  marginLeft: SIZES.base,
                }}
              >
                <Text style={styles.note}>Chính khóa</Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: COLORS.blue,
                  borderRadius: SIZES.radius,
                  marginLeft: SIZES.base,
                }}
              >
                <Text style={styles.note}>Phụ đạo</Text>
              </View>
            )}
          </View>
          <Text style={styles.class} numberOfLines={1} ellipsizeMode="tail">
            {item.item?.content}
          </Text>
          <Text style={styles.class}>Giáo viên: {item.item?.teacher}</Text>
        </View>
        <View
          style={{
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{ height: 40, width: 30 }}
          />
        </View>
      </View>

      <View style={styles.containerBottom}>
        <Text style={styles.classBottom}>
          Điểm bài tập về nhà: {item.item?.btvn_score}
        </Text>
        <Text style={styles.classBottom}>
          Nhận xét bài tập về nhà: {item.item?.btvn_comment}
        </Text>
        <Text style={styles.classBottom}>
          Điểm trên lớp: {item.item?.score}
        </Text>
        <Text style={styles.classBottom}>Nhận xét: {item.item?.comment}.</Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tình hình học tập chi tiết", {
            id: 1,
            data: item.item
          })
        }
      >
        <View style={styles.button}>
          <Text style={styles.textButon}>Tài liệu buổi học</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VerticalHomeSituation;

const styles = StyleSheet.create({
  component: {
    marginBottom: SIZES.padding,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    display: "flex",
    paddingVertical: SIZES.spacing,
  },

  lessonText: {
    color: COLORS.gray,
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  containerTop: {
    width: "100%",
    paddingHorizontal: SIZES.spacing,
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEFF1",
    paddingBottom: SIZES.spacing,
  },
  containerBottom: {
    paddingTop: SIZES.spacing,
    width: "100%",
    paddingHorizontal: SIZES.spacing,
    flex: 1,
  },
  content: {
    padding: 14,
  },
  className: {
    fontWeight: 600,
    fontSize: SIZES.h14,
  },
  class: {
    fontSize: 12,
    color: COLORS.gray,
    paddingTop: 2,
  },
  classBottom: {
    fontSize: 14,
    color: COLORS.gray,
    paddingTop: 4,
  },
  note: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 10,
    // marginLeft: 10
  },
  button: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderColor: COLORS.green,
    borderWidth: 1,
    width: 160,
    margin: 10,
    alignSelf: "flex-end",
  },
  textButon: {
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
