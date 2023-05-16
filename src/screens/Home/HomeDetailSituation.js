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


const VerticalSituation = ({ item }) => {
  console.log('item', item.item)
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
const HomeDetailSituation = ({ route, navigation }) => {
  const { id, data } = route.params;
  console.log('data', data)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
         <View style={{ margin: SIZES.padding }}>
      <Text style={styles.title}>{data.content}</Text>

      <View style={styles.boxs}>
        {data.documents.map((item, index) => {
          return (
            <View style={styles.box} key={index}>
              <FontAwesome name="folder" size={28} color={`${COLORS.green}`} />
              <Text style={styles.textBox}>{item}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.boxs}>
        {data.exercices.map((item, index) => {
          return (
            <View style={styles.box} key={index}>
              <FontAwesome name="folder" size={28} color={`${COLORS.green}`} />
              <Text style={styles.textBox}>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
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
    marginTop: 8
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
