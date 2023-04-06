import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
//npm
import { Ionicons } from "@expo/vector-icons";
//utils
import { COLORS, SIZES } from "../utils/theme";
const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;
const HeaderHome = () => {
  return (
    <SafeAreaView style={styles.header}>
      {/* <Text>HeaderHome</Text> */}
      <View style={styles.upperHeader}></View>
      <View style={styles.lowerHeader}>
        <View style={styles.feature}>
          <Ionicons name="home" size={30} color="white" />
          <Text style={styles.featureName}>Product1</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="home" size={30} color="white" />
          <Text style={styles.featureName}>Product1</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="home" size={30} color="white" />
          <Text style={styles.featureName}>Product1</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="home" size={30} color="white" />
          <Text style={styles.featureName}>Product1</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    width: "100%",
    backgroundColor: COLORS.green,
  },
  upperHeader: {
    height: 40,
  },
  lowerHeader: {
    height: LOWER_HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
    paddingHorizontal: 16
  },
  feature: {
    alignItems: 'center',
  },    
  featureName: {
    fontWeight: 'bold',
    fontSize: SIZES.h3,
    lineHeight: SIZES.font,
    color: 'white',
    marginTop: SIZES.spacing
  }
});
