import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import axios from "axios";
// redux
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { listClass } from "../../redux/actions/classActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
//components
import VerticalHomeSituation from "../../components/VerticalHomeSituation";

const HomeSituation = () => {
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { classes } = useSelector((state) => state.classReducer);
  const [selectedItem, setSelectItem] = useState(
    classes?.length > 0 ? classes[0].id : -1
  );
  const [defaultValue, setDefaultValue] = useState(
    classes?.length > 0 ? classes[0] : null
  );

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const listViewRef = useRef();
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);
  const headerHeight = useRef(new Animated.Value(120)).current;
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
    axios
      .post(
        BASE_URL + "sessions",
        {
          parent_id: user.id,
          class_id: selectedItem,
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
      })
      .catch((err) => {});
  }, [defaultValue, selectedItem]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.container, { height: headerHeight }]}>
        <SelectDropdown
          data={classes}
          buttonStyle={styles.select}
          dropdownStyle={{
            borderRadius: 8,
          }}
          defaultButtonText={"Chọn lớp học"}
          buttonTextStyle={styles.customText}
          defaultValue={defaultValue}
          // defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            setSelectItem(selectedItem.id);
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
            const x = new Number(selectedItem.year);
            return `Lớp ${selectedItem.name} - Năm học ${selectedItem.year}-${
              x + 1
            }`;
          }}
          rowTextForSelection={(item, index) => {
            const x = new Number(item.year);
            return `Lớp ${item.name} - Năm học ${item.year}-${x + 1}`;
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
              <Text style={[styles.textButton, { color: COLORS.green }]}>
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
              <Text style={[styles.textButton, { color: COLORS.blue }]}>
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
              <Text style={[styles.textButton, { color: COLORS.red }]}>
                Kiểm tra định kỳ
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.components}>
        <FlatList
          ref={listViewRef}
          onScroll={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            scrollDireaction.current =
              offsetY - lastOffsetY.current > 0 ? "down" : "up";
            lastOffsetY.current = offsetY;
            if (scrollDireaction.current == "down" && offsetY >= 60) {
              Animated.timing(headerHeight, {
                toValue: 0,
                duration: 50,
                useNativeDriver: false,
              }).start();
              Animated.timing(showArrowUp, {
                toValue: 1,
                duration: 50,
                useNativeDriver: false,
              }).start();
            }
            if (scrollDireaction.current == "up" && offsetY < 60) {
              Animated.timing(headerHeight, {
                toValue: 120,
                duration: 50,
                useNativeDriver: false,
              }).start();

              Animated.timing(showArrowUp, {
                toValue: 0,
                duration: 50,
                useNativeDriver: false,
              }).start();
            }
          }}
          style={{ flex: 1, backgroundColor: 'white', zIndex:10 }}
          data={data}
          renderItem={(item) => <VerticalHomeSituation item={item} />}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
        />
      </View>

      <Animated.View 
       style={[styles.upButtonStyle, {opacity: showArrowUp }]}
       >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={upButtonHandler}
         
        >
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
    zIndex: 1
  },
  select: {
    width: "100%",
    borderRadius: SIZES.base,
    marginTop: SIZES.padding,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 0.7,
    zIndex:1
  },
  customText: {
    textAlign: "left",
  },
  buttons: {
    flexDirection: "row",
    columnGap: 6,
    marginTop: SIZES.padding,
    zIndex: 1
  },
  textButton: { color: "white", paddingHorizontal: 14, paddingVertical: 7 },
  components: { flex: 1 , zIndex:10},
  upButtonStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    left: 20,
    bottom:10,
    zIndex: 100,
  },
  upButtonImageStyle: {
    width: 50,
    height: 50,
  },
});
