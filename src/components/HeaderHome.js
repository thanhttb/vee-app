import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Pressable,
} from "react-native";
// redux
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { listClass } from "../redux/actions/classActions";
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
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { classes } = useSelector((state) => state.classReducer);

  useEffect(() => {
    dispatch(listClass(user?.id));
  }, [dispatch]);

  return (
    <View style={styles.header}>
      <Animated.View
        style={[styles.upperHeader, { height: headerHeight }]}
      ></Animated.View>
      <View style={styles.lowerHeader}>
        <Animated.View style={[styles.featureSmall, depositViewAnimation]}>
          {/* <TouchableOpacity onPressIn={() => navigation.navigate("Bảng tin")} style={{height: 33}}> */}
          <Animated.Image
            source={require("../../assets/icon-home/bang-tin.png")}
            style={[styles.bangtin]}
          />
          {/* </TouchableOpacity> */}
          <Animated.Text
            numberOfLines={2}
            style={[
              styles.featureName,
              featureIconCircleAnimation,
              { height: headerWidth },
            ]}
          >
            Bảng tin
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.featureBig, withdrawViewAnimation]}>
          <TouchableOpacity
            onPressIn={() =>
              navigation.navigate("Tình hình học tập", {
                classId: classes?  classes[0]?.id : -1,
              })
            }
            style={{ height: 33, paddingTop: 9 }}
          >
            <Animated.Image
              source={require("../../assets/icon-home/thht1.png")}
              style={[styles.thht]}
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

        <Animated.View style={[styles.featureBig, scanViewAnimation]}>
          <TouchableOpacity
             onPressIn={() =>
              navigation.navigate("Tư liệu buổi học", {
                classId: classes?  classes[0]?.id : -1,
              })
            }
            style={{ height: 33, paddingTop: 5 }}
          >
            <Animated.Image
              source={require("../../assets/icon-home/tlbh.png")}
              style={[styles.tlbh]}
            />
          </TouchableOpacity>

          <Animated.Text
            numberOfLines={1}
            style={[
              styles.featureName,
              homeworkIconAnimation,
              { height: headerWidth },
            ]}
          >
            Tư liệu buổi học
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.featureSmall, qrViewAnimation]}>
          <TouchableOpacity
            onPressIn={() => navigation.navigate("Học phí")}
            style={{ height: 33, paddingTop: 10 }}
          >
            <Animated.Image
              source={require("../../assets/icon-home/hoc-phi.png")}
              style={[styles.hocphi]}
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
  featureSmall: {
    alignItems: "center",
    width: "15%",
  },
  featureBig: {
    alignItems: "center",
    width: "30%",
  },
  thht: {
    height: 20,
    width: 30,
  },
  tlbh: {
    width: 27,
    height: 27,
  },
  bangtin: {
    width: 24,
    height: 33,
  },
  hocphi: {
    width: 27,
    height: 20,
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
