import React, { useRef, useState } from "react";
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
//npm
import _ from "lodash";
//component
import HeaderHome from "../../components/HeaderHome";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { getFeatureViewAnimation } from "../../utils/utils";
import { dataPost } from "../../utils/fakeData";
import VerticalPostCard from "../../components/VerticalPostCard";

const UPPER_HEADER_HEIGHT = 36;
const UPPER_HEADER_PADDING_TOP = 4;

const Home = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);
  const animatedHeightValue = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(80)).current;
  const headerWidth = useRef(new Animated.Value(28)).current;

  const depositViewAnimation = getFeatureViewAnimation(animatedValue, 0);
  const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, 0);
  const qrViewAnimation = getFeatureViewAnimation(animatedValue, 0);
  const scanViewAnimation = getFeatureViewAnimation(animatedValue, 0);

  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 25],
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
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 25],
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

  const featureIconAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 25],
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

  const homeworkIconAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 25],
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

  const heightViewAnimated = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8],
          extrapolate: "clamp",
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, -1.5],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
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
      <HeaderHome
        depositViewAnimation={depositViewAnimation}
        withdrawViewAnimation={withdrawViewAnimation}
        qrViewAnimation={qrViewAnimation}
        scanViewAnimation={scanViewAnimation}
        featureNameAnimation={featureNameAnimation}
        featureIconCircleAnimation={featureIconCircleAnimation}
        featureIconAnimation={featureIconAnimation}
        homeworkIconAnimation={homeworkIconAnimation}
        heightViewAnimated={heightViewAnimated}
        headerWidth={headerWidth}
        headerHeight={headerHeight}
        animatedHeightValue={animatedHeightValue}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          {
            const offsetY = e.nativeEvent.contentOffset.y;
            scrollDireaction.current =
              offsetY - lastOffsetY.current > 0 ? "down" : "up";
            lastOffsetY.current = offsetY;
            if (offsetY > 24) {
              Animated.timing(headerWidth, {
                toValue: 0,
                duration: 30,
                useNativeDriver: false,
              }).start();
              Animated.timing(headerHeight, {
                toValue: 70,
                duration: 30,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(headerWidth, {
                toValue: 28,
                duration: 30,
                useNativeDriver: false,
              }).start();
              Animated.timing(headerHeight, {
                toValue: 80,
                duration: 30,
                useNativeDriver: false,
              }).start();
            }
            animatedValue.setValue(offsetY);
          }
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.paddingForHeader}></View>
        <Animated.View style={styles.scrollViewContent}>
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
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex: 10
  },
  upperHeaderPlaceHolder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },

  paddingForHeader: {
    // height: UPPER_HEADER_HEIGHT  + UPPER_HEADER_PADDING_TOP,
  },
  scrollViewContent: {
    backgroundColor: COLORS.white,
    zIndex: 100,
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
