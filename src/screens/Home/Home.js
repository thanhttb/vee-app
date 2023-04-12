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
import HeaderHome from "../../components/HeaderHome";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { getFeatureViewAnimation } from "../../utils/utils";
import { dataPost } from "../../utils/fakeData";
import VerticalPostCard from "../../components/VerticalPostCard";

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
      inputRange: [0, 20],
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
      />
      <ScrollView
      style={{zIndex: 10}}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDireaction.current =
            offsetY - lastOffsetY.current > 0 ? "down" : "up";
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
       
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
    zIndex: 10
  },
  upperHeaderPlaceHolder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  
  paddingForHeader: {
    // height: LOWER_HEADER_HEIGHT,
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
