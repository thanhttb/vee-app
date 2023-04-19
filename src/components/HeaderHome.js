import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Pressable,
} from "react-native";
//npm
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";
//utils
import { COLORS, SIZES } from "../utils/theme";
const UPPER_HEADER_HEIGHT = 40;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const HeaderHome = ({
  depositViewAnimation,
  withdrawViewAnimation,
  qrViewAnimation,
  scanViewAnimation,
  featureNameAnimation,
  featureIconCircleAnimation,
  featureIconAnimation,
  homeworkIconAnimation,
  heightViewAnimated
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.upperHeader}></View>
      <View style={styles.lowerHeader}>
        <Animated.View style={[styles.feature, depositViewAnimation]}>
          <TouchableOpacity onPressIn={() => navigation.navigate("Lịch học")}>
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>
          <Animated.Text
            numberOfLines={2} style={[styles.featureName, featureIconCircleAnimation]}
          >
            Lịch học
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.feature, withdrawViewAnimation]}>
          <Animated.Image
            source={require("../../assets/icon/Home_Focus.png")}
            style={[styles.bellIco]}
          />

          <Animated.Text numberOfLines={2} style={[styles.featureName, featureNameAnimation]}>
            Tình hình học tập
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.feature,qrViewAnimation]}>
          <TouchableOpacity onPressIn={() => navigation.navigate("Học phí")}>
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>

          <Animated.Text numberOfLines={2} style={[styles.featureName,featureIconAnimation]}>Học phí</Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.feature,scanViewAnimation]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Bài tập về nhà")}
          >
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>

          <Animated.Text numberOfLines={2} style={[styles.featureName,homeworkIconAnimation]}>
            Bài tập về nhà
          </Animated.Text>
        </Animated.View>
      </View>
      <Animated.View style={[styles.upperHeader_2, heightViewAnimated]}></Animated.View>
    </SafeAreaView>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    // position: 'absolute',
    marginTop: -LOWER_HEADER_HEIGHT -UPPER_HEADER_PADDING_TOP,
    width: "100%",
    backgroundColor: COLORS.green,
    zIndex: 1,
  },
  upperHeader: {
    height: UPPER_HEADER_HEIGHT -10,
    zIndex: 1,
  },
  upperHeader_2:{
    height: UPPER_HEADER_PADDING_TOP ,
    backgroundColor: 'white',
    // zIndex: 1,
  },
  lowerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    // zIndex: 1,
  },
  feature: {
    alignItems: "center",
  },
  bellIco: {
    width: 32,
    height: 32,
    zIndex: 1,
  },
  bellIcon: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
  },
  featureName: {
    fontWeight: "bold",
    fontSize: SIZES.h3,
    lineHeight: SIZES.font,
    color: "white",
    marginVertical: SIZES.base,
    
  },
});
