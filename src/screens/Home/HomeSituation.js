import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import axios from "axios";
// redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { listClass } from "../../redux/actions/classActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
//components
import VerticalHomeSituation from "../../components/Vertical/VerticalHomeSituation";
import VerticalSelect from "../../components/Vertical/VerticalSelect";

const HomeSituation = ({ route, navigation }) => {
  const { classId } = route?.params;
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { classes } = useSelector((state) => state.classReducer);
  const [selectedItem, setSelectItem] = useState(
    classes?.length > 0 ? classes[0] : null
  );
  const [defaultValue, setDefaultValue] = useState(
    classes?.length > 0 ? classes[0] : null
  );

  const [isParam, setIsParam] = useState(true);

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const listViewRef = useRef();
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);
  const showArrowUp = useRef(new Animated.Value(0)).current;

  const upButtonHandler = () => {
    listViewRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    dispatch(listClass(user?.id));
  }, [dispatch]);

  const filterData = (v) => {
    const data = dataFilter.filter((item) => item.type == v);
    setData(data);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        BASE_URL + "sessions",
        {
          parent_id: user.id,
          class_id: selectedItem?.id,
          student_id: selectedItem?.student_id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        setData(response.data.sessions);
        setDataFilter(response.data.sessions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [selectedItem, classId]);

  useEffect(() => {
    if (classId !== -1) {
      let index = classes.findIndex((item) => item.id == classId);
      if (index !== -1) {
        setSelectItem(classes[index]);
        setDefaultValue(classes[index]);
      }
      setIsParam(true);
    } else {
      setIsParam(false);
    }
  }, [classId]);

  useEffect(() => {
    if (selectedItem !== null) {
      let index = classes.findIndex((item) => item.id == selectedItem.id);
      if (index !== -1) {
        setSelectItem(classes[index]);
        setDefaultValue(classes[index]);
      }
      setIsParam(true);
    } else {
      setIsParam(false);
    }
  }, [selectedItem]);


  const listEmptyData = () => {
    return (
      <View style={styles.loading}>
        <Text>Chưa có danh sách buổi học</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />

      {isLoading == true ? (
        <View style={styles.loadingData}>
          <ActivityIndicator size={"small"} />
          <Text> Loading....</Text>
        </View>
      ) : (
        <>
          {isParam == true ? (
            <>
              <View style={styles.components}>
                <FlatList
                  ref={listViewRef}
                  onScroll={(e) => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    scrollDireaction.current =
                      offsetY - lastOffsetY.current > 0 ? "down" : "up";
                    lastOffsetY.current = offsetY;
                    if (scrollDireaction.current == "down" && offsetY >= 100) {
                      Animated.timing(showArrowUp, {
                        toValue: 1,
                        duration: 40,
                        useNativeDriver: false,
                      }).start();
                    }
                    if (scrollDireaction.current == "up" && offsetY < 100) {
                      Animated.timing(showArrowUp, {
                        toValue: 0,
                        duration: 40,
                        useNativeDriver: false,
                      }).start();
                    }
                  }}
                  style={{ flex: 1, backgroundColor: "white", zIndex: 10 }}
                  data={data}
                  renderItem={(item) => <VerticalHomeSituation item={item} />}
                  ListEmptyComponent={listEmptyData}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEventThrottle={16}
                  removeClippedSubviews={true}
                  ListHeaderComponent={
                    <View style={styles.container}>
                      <SelectDropdown
                        data={classes}
                        buttonStyle={styles.select}
                        dropdownStyle={{
                          borderRadius: 8,
                          maxHeight: 400,
                        }}
                        rowStyle={{ height: 70, justifyContent: "center" }}
                        defaultButtonText={"Chọn lớp học"}
                        buttonTextStyle={styles.customText}
                        defaultValue={defaultValue}
                        onSelect={(selectedItem, index) => {
                          setSelectItem(selectedItem)
                        }}
                        renderDropdownIcon={(isOpened) => {
                          return (
                            <FontAwesome
                              name={isOpened ? "chevron-up" : "chevron-down"}
                              color={"#637381"}
                              size={14}
                              style={{ marginRight: 10 }}
                            />
                          );
                        }}
                        dropdownIconPosition={"right"}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return (<View
                            style={{
                              justifyContent: "center",
                              paddingTop: 4,
                            }}
                          >
                            <Text>
                              Lớp: {selectedItem?.name} - Năm học:{" "}
                              {selectedItem?.year}
                            </Text>
                            <Text>
                              Học sinh: {selectedItem?.student_name}
                            </Text>
                          </View>)
                          
                        }}

                        renderCustomizedRowChild={(item, index) => {
                          return (
                            <VerticalSelect
                            item={item}
                            key={item.id}
                            selectedItem={selectedItem}
                          />
                          );
                        }}
                      />

                      <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => filterData("main")}>
                          <View
                            style={{
                              borderRadius: SIZES.radius,
                              borderColor: COLORS.green,
                              borderWidth: 1,
                            }}
                          >
                            <Text
                              style={[
                                styles.textButton,
                                { color: COLORS.green },
                              ]}
                            >
                              Chính khóa
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => filterData("tutor")}>
                          <View
                            style={{
                              borderRadius: SIZES.radius,
                              borderColor: COLORS.blue,
                              borderWidth: 1,
                            }}
                          >
                            <Text
                              style={[
                                styles.textButton,
                                { color: COLORS.blue },
                              ]}
                            >
                              Phụ đạo
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => filterData("exam")}>
                          <View
                            style={{
                              borderRadius: SIZES.radius,
                              borderColor: COLORS.red,
                              borderWidth: 1,
                            }}
                          >
                            <Text
                              style={[styles.textButton, { color: COLORS.red }]}
                            >
                              Kiểm tra định kỳ
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  Chưa có thông tin học tập
                </Text>
              </View>
            </>
          )}
        </>
      )}

      <Animated.View style={[styles.upButtonStyle, { opacity: showArrowUp }]}>
        <TouchableOpacity activeOpacity={0.5} onPress={upButtonHandler}>
          <Entypo
            name="chevron-up"
            size={40}
            color={COLORS.green}
            style={styles.upButtonImageStyle}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default HomeSituation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: SIZES.padding,
    zIndex: 1,
  },
  select: {
    width: "100%",
    borderRadius: SIZES.base,
    marginTop: SIZES.padding,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 1,
    zIndex: 1,
  },
  customText: {
    textAlign: "left",
  },
  buttons: {
    flexDirection: "row",
    columnGap: 6,
    marginTop: SIZES.padding,
    zIndex: 1,
  },
  textButton: { color: "white", paddingHorizontal: 14, paddingVertical: 7 },
  components: { flex: 1, zIndex: 10 },
  upButtonStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    left: 20,
    bottom: 10,
    zIndex: 100,
  },
  upButtonImageStyle: {
    width: 50,
    height: 50,
  },
  customSelect: { fontSize: 13, fontWeight: 700, color: "#637381" },
  loading: {
    flex: 1,
    height: SIZES.height - 280,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingData: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
