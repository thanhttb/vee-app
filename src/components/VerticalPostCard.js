import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import HTMLView from "react-native-htmlview";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

const VerticalPostCard = ({ item }) => {
  const navigation = useNavigation();
  console.log("item", item);

  const date = moment(item.date).startOf("hour").fromNow();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header  */}
        <View style={styles.header}>
          <Image source={{ uri: item.avatar }} style={styles.imageHeader} />
          <View style={styles.headerRight}>
            <View style={styles.headerRightTop}>
              <Text style={{ fontWeight: 500, fontSize: 18 }}>{item.name}</Text>

              {item.type == 1 && (
                <View
                  style={{
                    backgroundColor: COLORS.green,
                    borderRadius: SIZES.radius,
                    marginLeft: SIZES.base,
                  }}
                >
                  <Text style={styles.type}>Thông báo</Text>
                </View>
              )}
            </View>

            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        {/* Content  */}
        <View style={{ padding: SIZES.padding }}>
          <Text style={styles.title}>{item.content}</Text>
          <HTMLView value={item?.description} />
        </View>
        <Image source={{ uri: item.file }} style={styles.file} />

        {/* Actions  */}
        <View>
          <View style={styles.interact}>
            <Text>15 lượt thích</Text>
            <Text>2 Bình luận</Text>
          </View>
          <View style={styles.action}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <AntDesign name="like2" size={24} color="black" />
              <AntDesign name="like1" size={24} color="black" />
              <Text>Thích</Text>
            </View>

            <View style={{ flexDirection: "row" ,alignItems: 'center'}}>
              <FontAwesome name="comment-o" size={24} color="black" />
              <FontAwesome name="comment" size={24} color="black" />
              <Text>Bình luận</Text>
            </View>
          </View>
        </View>

        {/* Comments  */}

      </View>
    </View>
  );
};

export default VerticalPostCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.padding,
    marginTop: 18,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  imageHeader: {
    height: 40,
    width: 40,
  },
  headerRight: {
    marginLeft: 10,
  },
  headerRightTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    paddingBottom: 4,
  },
  file: {
    marginTop: 4,
    height: 100,
    width: "100%",
    resizeMode: "cover",
  },
  interact: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4
  },
  action: {
    flexDirection: "row",
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.input,
    paddingVertical: 12
  },
});
