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
  headerWidth,
  headerHeight,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Animated.View
        style={[styles.upperHeader, { height: headerHeight }]}
      ></Animated.View>
      <View style={styles.lowerHeader}>
        <Animated.View style={[styles.feature, depositViewAnimation]}>
          <TouchableOpacity onPressIn={() => navigation.navigate("Lịch học")}>
            <Animated.Image
              source={require("../../assets/icon-home/thong-bao.jpg")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>
          <Animated.Text
            numberOfLines={2}
            style={[
              styles.featureName,
              featureIconCircleAnimation,
              { height: headerWidth },
            ]}
          >
            Lịch học
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.feature, withdrawViewAnimation]}>
          <TouchableOpacity onPressIn={() => navigation.navigate("Tình hình học tập")}>
            <Animated.Image
              source={require("../../assets/icon-home/hoc-tap.jpg")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>
          <Animated.Text
            numberOfLines={2}
            style={[
              styles.featureName,
              featureNameAnimation,
              { height: headerWidth },
            ]}
          >
            Tình hình học tập
          </Animated.Text>
        </Animated.View>

        <Animated.View style={[styles.feature, scanViewAnimation]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tư liệu buổi học")}
          >
            <Animated.Image
              source={require("../../assets/icon-home/btvn.jpg")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>

          <Animated.Text
            numberOfLines={2}
            style={[
              styles.featureName,
              homeworkIconAnimation,
              { height: headerWidth },
            ]}
          >
            Tư liệu buổi học
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.feature, qrViewAnimation]}>
          <TouchableOpacity onPressIn={() => navigation.navigate("Học phí")}>
            <Animated.Image
              source={require("../../assets/icon-home/hoc-phi.jpg")}
              style={[styles.bellIco]}
            />
          </TouchableOpacity>

          <Animated.Text
            numberOfLines={2}
            style={[
              styles.featureName,
              featureIconAnimation,
              { height: headerWidth },
            ]}
          >
            Học phí
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    // position: 'absolute',
    marginTop: -LOWER_HEADER_HEIGHT,
    width: "100%",
    backgroundColor: COLORS.green,
    zIndex: 1,
  },
  upperHeader: {
    height: UPPER_HEADER_HEIGHT * 2.5,
    zIndex: 1,
  },
  upperHeader_2: {
    height: UPPER_HEADER_PADDING_TOP,
    backgroundColor: "white",
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
    width: "15%",
  },
  bellIco: {
    width: 36,
    height: 36,
    zIndex: 1,
    borderRadius: 50,
  },
  bellIcon: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
  },
  featureName: {
    fontWeight: 600,
    fontSize: SIZES.h3,
    lineHeight: SIZES.font,
    color: "white",
    marginVertical: 3,
    textAlign: "center",
    height: 28,
  },
});
