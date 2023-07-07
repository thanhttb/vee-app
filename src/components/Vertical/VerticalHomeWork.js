import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import moment from "moment";

const VerticalHomeWork = ({ item, handleShowModal, show }) => {
  const navigation = useNavigation();


  const date = moment(item.item?.date).format("DD-MM-YYYY");

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Tình hình học tập chi tiết", {
         data: item.item,
        })
      }
    >
      <View style={styles.component}>
        <View
          style={[
            styles.lesson,
            item.item.type == "main" && { backgroundColor: COLORS.green },
            item.item.type == "exam" && { backgroundColor: COLORS.red },
            item.item.type == "tutor" && { backgroundColor: COLORS.blue },
          ]}
        ></View>

        <View style={styles.container}>
          <View style={{ width: "75%" }}>
            <Text style={styles.className}>{date}</Text>
            <Text style={styles.class} ellipsizeMode="tail">
              {item.item.content}
            </Text>
            <Text style={styles.class}>Giáo viên: {item.item.teacher}</Text>
          </View>
          <View
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="folder" size={28} color={`${COLORS.green}`} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
