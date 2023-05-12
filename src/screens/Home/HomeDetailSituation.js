import React from "react";
import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { FontAwesome } from "@expo/vector-icons";

const data = [
  {
    id: 1,
    title: "Tài liệu buổi học",
    description:
      "Hoàn thành bài 1, 3, 5 trong phiếu Vị trí đường tròn và tiếp tuyến",
    exam: [
      {
        id: 1,
        title: "Vị trí dường tròn và tiếp truyến",
        src: "file1.pdf",
      },
      {
        id: 2,
        title: "File nghe bài nghe 01.mp3",
        src: "file2.mp3",
      },
    ],
  },
  {
    id: 2,
    title: "Bài tập về nhà",
    description:
      "Hoàn thành bài 1, 3, 5 tron phiếu Vị trí đường tròn và tiếp tuyến",
    exam: [
      {
        id: 1,
        title: "Vị trí dường tròn và tiếp truyến",
        src: "file1.pdf",
      },
      {
        id: 2,
        title: "File nghe bài nghe 01.mp3",
        src: "file2.mp3",
      },
    ],
  },
];

const VerticalSituation = ({ item }) => {
  return (
    <View style={{ margin: SIZES.padding }}>
      <Text style={styles.title}>{item.item.title}</Text>
      <Text style={styles.desc}>{item.item.description}</Text>

      <View style={styles.boxs}>
        {item.item.exam.map((data) => {
          return (
            <View style={styles.box} key={data.id}>
              <FontAwesome name="folder" size={28} color={`${COLORS.green}`} />
              <Text style={styles.textBox}>{data.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const HomeDetailSituation = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        {/*  */}
        <FlatList
        style={{height: '100%'}}
          data={data}
          renderItem={(item) => <VerticalSituation item={item} />}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HomeDetailSituation;

const styles = StyleSheet.create({
  container: {
    // margin: SIZES.padding,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  desc: {
    paddingVertical: 10,
  },
  boxs: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  box: {
    padding: SIZES.spacing,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#EDEFF1",
    borderBottomWidth: 1,
  },
  image: {
    height: 30,
    width: 30,
  },
  textBox: {
    color: COLORS.gray,
    fontSize: 13,
    paddingLeft: SIZES.spacing,
  },
});
