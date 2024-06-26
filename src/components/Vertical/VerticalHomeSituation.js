import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import HTMLView from "react-native-htmlview";

const VerticalHomeSituation = ({ item }) => {
  const navigation = useNavigation();
  const date = moment(item.item?.date).format("DD-MM-YYYY");

  return (
    <View style={styles.component}>
      <View style={styles.containerTop}>
        <View style={{ width: "75%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.className}>Ca học ngày {date}</Text>
            {item.item.type == "exam" ? (
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
            ) : item.item.type == "main" ? (
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
            ) : (
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
          {item.item?.content != "[]" && item.item?.content != null && (
            <Text style={styles.class} numberOfLines={1} ellipsizeMode="tail">
              {item.item?.content}
            </Text>
          )}

          <Text style={styles.class}>Giáo viên: {item.item?.teacher}</Text>
        </View>
        <View
          style={{
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/logo.png")}
            style={{ height: 40, width: 30 }}
          />
        </View>
      </View>

      <View style={styles.containerBottom}>
        {item.item?.btvn_score != "//" && item.item?.btvn_score != null && (
          <Text style={styles.classBottom}>
            Điểm bài tập về nhà:
            <Text style={styles.textBold}> {item.item?.btvn_score}</Text>
          </Text>
        )}
        {item.item?.btvn_comment != null && (
          <Text style={styles.classBottom}>
            Nhận xét bài tập về nhà:
            <Text style={styles.textBold}> {item.item?.btvn_comment}</Text>
          </Text>
        )}

        {item.item?.score != null && item.item?.score != " " && (
          <Text style={styles.classBottom}>
            Điểm trên lớp:{" "}
            <Text style={styles.textBold}>{item.item?.score}</Text>
          </Text>
        )}

        {item.item?.comment != null && <HTMLView value={item.item?.comment} />}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Liên hệ giáo viên", {
              teacher_id: item.item.teacher_id,
            })
          }
        >
          <View style={styles.button}>
            <Text style={styles.textButton}>Liên hệ giáo viên</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tình hình học tập chi tiết", {
              data: item.item,
            })
          }
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: COLORS.green,
              },
            ]}
          >
            <Text style={[styles.textButton, { color: "white" }]}>
              Tài liệu buổi học
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerticalHomeSituation;

const styles = StyleSheet.create({
  component: {
    marginVertical: 10,
    marginHorizontal: SIZES.padding,
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

  typeTag: {
    borderRadius: SIZES.radius,
    marginLeft: SIZES.base,
    marginBottom: 2
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
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    paddingVertical: 4,
    marginTop: 10
  },
  button: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderColor: COLORS.green,
    borderWidth: 1,
    width: "100%",
    alignSelf: "flex-end",
  },
  textButton: {
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    textAlign: "center",
  },
  textBold: {
    fontWeight: 500,
    color: "black",
  },
});
