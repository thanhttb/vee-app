import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import {useNavigation} from '@react-navigation/native';

const VerticalPostCard = ({ item }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={() =>
            navigation.push('Trang thông tin', {
              id: item.id,
              title: item.title
            })
          }>
        <Image style={styles.image} source={item.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}> {item.date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VerticalPostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.padding,
    marginTop: 18,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.spacing,
  },
  title: {
    fontWeight: 600,
    fontSize: SIZES.font,
  },
  date: {
    fontSize: SIZES.h3,
    color: COLORS.gray,
    paddingTop: 4,
  },
});
