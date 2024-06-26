import React, { useRef, useState, useEffect } from "react";
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
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
//npm
import _ from "lodash";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//component
import HeaderHome from "../../components/HeaderHome";
// redux
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { listClass } from "../../redux/actions/classActions";
import { userList } from "../../redux/actions/userActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { getFeatureViewAnimation } from "../../utils/utils";
import VerticalPostCard from "../../components/Vertical/VerticalPostCard";
import { BASE_URL } from "../../../config";
import { Alert } from "react-native";

const UPPER_HEADER_HEIGHT = 36;
const UPPER_HEADER_PADDING_TOP = 4;

const Home = () => {
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedHeightValue = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(80)).current;
  const headerWidth = useRef(new Animated.Value(28)).current;

  const depositViewAnimation = getFeatureViewAnimation(animatedValue, 0);
  const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, 0);
  const qrViewAnimation = getFeatureViewAnimation(animatedValue, 0);
  const scanViewAnimation = getFeatureViewAnimation(animatedValue, 0);

  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { users } = useSelector((state) => state.userReducer);
  const { classes, isLoadingClass } = useSelector(
    (state) => state.classReducer
  );

  const [dataPost, setDataPost] = useState([]);
  const [arrClass, setArrClass] = useState([]);

  const [isAlertShown, setIsAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [arrClass]);

  useEffect(() => {
    dispatch(listClass(user?.id));
    dispatch(userList(user?.id));
  }, [dispatch]);

  const getData = async () => {
    setLoading(true);
    await axios
      .post(
        BASE_URL + "feed/get",
        {
          parent_id: user.id,
          class_ids: arrClass,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        setDataPost(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Home loading get onReached", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    let idArray = classes.map((item) => item.id);
    setArrClass(idArray);
  }, [classes]);

  useEffect(() => {
    setLoading(true);
    if (isLoadingClass == false) {
      axios
        .post(
          BASE_URL + "feed/get",
          {
            parent_id: user.id,
            class_ids: arrClass,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + authToken,
            },
          }
        )
        .then((response) => {
          setDataPost(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Home err", err);
          setLoading(false);
        });
    }
  }, [arrClass]);

  const showAlert = () => {
    Alert.alert(
      "VietElite",
      "Chưa hoàn thành ảnh đại diện học sinh",
      [
        { text: "Để sau", onPress: () => console.log("OK Pressed") },
        {
          text: "Cập nhật ngay",
          onPress: () => {
            navigation.navigate("Cá nhân", {
              screen: "Thông tin học sinh",
              initial: false,
            });
          },
        },
      ],
      {
        userInterfaceStyle: "light",
      }
    );
  };

  useEffect(() => {
    let timeout;

    const checkAvatars = () => {
      const isCheck = users.every((item) => item.avatar != null);
      if (!isCheck && !isAlertShown) {
        showAlert();
        setIsAlertShown(true);
      }
    };

    timeout = setTimeout(checkAvatars, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [users]);

  const fetchRecords = (page) => {
    const newRecords = [];
    for (var i = page * 5, il = i + 5; i < il && i < dataPost.length; i++) {
      newRecords.push(dataPost[i]);
    }
    setDataPost([...dataPost, ...newRecords]);
  };

  const onScrollHandler = () => {
    setPage(page + 1);
    fetchRecords(page);
  };

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

  return (
    <GestureHandlerRootView style={styles.safeview}>
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
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
                if (scrollDireaction.current == "down" && offsetY >= 24) {
                  Animated.timing(headerWidth, {
                    toValue: 0,
                    duration: 40,
                    useNativeDriver: false,
                  }).start();
                  Animated.timing(headerHeight, {
                    toValue: 70,
                    duration: 40,
                    useNativeDriver: false,
                  }).start();
                }
                if (scrollDireaction.current == "up" && offsetY < 24) {
                  Animated.timing(headerWidth, {
                    toValue: 28,
                    duration: 40,
                    useNativeDriver: false,
                  }).start();
                  Animated.timing(headerHeight, {
                    toValue: 70,
                    duration: 40,
                    useNativeDriver: false,
                  }).start();
                }
                animatedValue.setValue(offsetY);
              }
            }}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={"#01A191"}
                title={"Loading..."}
                titleColor={"#01A191"}
                colors={["#01A191", "#41CFBD"]}
                progressBackgroundColor={"#FFFFFF"}
              />
            }
          >
            <View style={styles.paddingForHeader}></View>
            <Animated.View style={styles.scrollViewContent}>
              {loading == true || isLoadingClass == true ? (
                <View style={styles.loading}>
                  <ActivityIndicator size={"small"} />
                  <Text style={{ textAlign: "center" }}> Loading...</Text>
                </View>
              ) : (
                <>
                  {dataPost?.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <View style={{ marginHorizontal: SIZES.padding }}>
                        {/* <TouchableOpacity
                          onPress={() => navigation.navigate("Khảo sát")}
                        >
                          <Image
                            source={require("../../../assets/ket-qua-01.jpg")}
                            style={{
                              width: "100%",
                              height: 180,
                              borderRadius: 16,
                              marginTop: SIZES.padding,
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => {
                            Linking.openURL(
                              "https://thithu.vietelite.edu.vn/#dang-ky"
                            ).catch((err) =>
                              console.error("Couldn't load page", err)
                            );
                          }}
                        >
                          <Image
                            source={require("../../../assets/ls.jpg")}
                            style={{
                              width: "100%",
                              height: 200,
                              borderRadius: 16,
                              marginTop: SIZES.padding,
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        nestedScrollEnabled
                        style={{ flex: 1, paddingBottom: 20 }}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={dataPost}
                        data={dataPost}
                        scrollEnabled={false}
                        renderItem={(item) => <VerticalPostCard item={item} />}
                      />
                    </View>
                  ) : (
                    <View style={styles.loading}>
                      <Text>Chưa có bài viết</Text>
                    </View>
                  )}
                </>
              )}
            </Animated.View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeview: { flex: 1, backgroundColor: "white" },
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
  loading: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: SIZES.height * 0.7,
  },
});
