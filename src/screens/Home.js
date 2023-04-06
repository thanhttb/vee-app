import React, { useRef } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  Image,
  FlatList,
} from "react-native";

//component
import HeaderHome from "../components/HeaderHome";
//utils
import { COLORS, SIZES } from "../utils/theme";
import { getFeatureViewAnimation } from "../utils/utils";
import { dataPost } from "../utils/fakeData";
import VerticalPostCard from "../components/VerticalPostCard";

const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;
const Home = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);

  const depositViewAnimation = getFeatureViewAnimation(animatedValue, 40);
  const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, 10);
  const qrViewAnimation = getFeatureViewAnimation(animatedValue, -20);
  const scanViewAnimation = getFeatureViewAnimation(animatedValue, -50);

  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const featureIconCircleAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 55],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const renderItem = ({ item, index }) => (
    <VerticalPostCard item={item} key={index} />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.upperHeaderPlaceHolder}></View>
      </SafeAreaView>
      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}></View>
        <View style={styles.lowerHeader}>
          <Animated.View style={[styles.feature, depositViewAnimation]}>
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco, featureIconCircleAnimation]}
            />
            <Animated.Image
              source={require("../../assets/icon/Noti_Outline.png")}
              style={[styles.bellIcon, featureIconAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              Product1
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.feature, withdrawViewAnimation]}>
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco, featureIconCircleAnimation]}
            />
            <Animated.Image
              source={require("../../assets/icon/Noti_Outline.png")}
              style={[styles.bellIcon, featureIconAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              Product1
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.feature, qrViewAnimation]}>
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco, featureIconCircleAnimation]}
            />
            <Animated.Image
              source={require("../../assets/icon/Noti_Outline.png")}
              style={[styles.bellIcon, featureIconAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              Product1
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.feature, scanViewAnimation]}>
            <Animated.Image
              source={require("../../assets/icon/Home_Focus.png")}
              style={[styles.bellIco, featureIconCircleAnimation]}
            />
            <Animated.Image
              source={require("../../assets/icon/Noti_Outline.png")}
              style={[styles.bellIcon, featureIconAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              Product1
            </Animated.Text>
          </Animated.View>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDireaction.current =
            offsetY - lastOffsetY.current > 0 ? "down" : "up";
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        // onScrollEndDrag={() => {
        //   scrollViewRef.current?.scrollTo({
        //     y: scrollDireaction.current === 'down' ? SIZES.height : 0,
        //     animated: true,
        //   });
        // }}
        scrollEventThrottle={16}
      >
        <View style={styles.paddingForHeader}></View>
        <View style={styles.scrollViewContent}>
          <Text style={styles.textInfo}>Thông tin VietElite</Text>
          <View style={{ flex: 1 }}>
            <FlatList
              nestedScrollEnabled
              style={{ flex: 1, paddingBottom: 20 }}
              keyExtractor={(item, index) => index.toString()}
              data={dataPost}
              scrollEnabled={false}
              renderItem={renderItem}
              
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperHeaderPlaceHolder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: "absolute",
    width: "100%",
    backgroundColor: COLORS.green,
  },
  upperHeader: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  lowerHeader: {
    height: LOWER_HEADER_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  feature: {
    alignItems: "center",
  },
  bellIco: {
    width: 32,
    height: 32,
    backgroundColor: "white",
  },
  bellIcon: {
    position: "absolute",
    // marginTop: 8,
    backgroundColor: "white",
  },
  featureName: {
    fontWeight: "bold",
    fontSize: SIZES.h3,
    lineHeight: SIZES.font,
    color: "white",
    marginTop: SIZES.spacing,
  },
  paddingForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  scrollViewContent: {
    backgroundColor: COLORS.white,
    // height: SIZES.height,
  },
  textInfo: {
    color: "black",
    fontWeight: "bold",
    fontSize: SIZES.h2,
    paddingTop: SIZES.padding,
    paddingLeft: SIZES.padding,
  },
});
