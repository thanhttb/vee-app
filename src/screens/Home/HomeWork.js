import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import PDFReader from "rn-pdf-reader-js";
import axios from "axios";
import { Video, ResizeMode } from "expo-av";
// redux
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { listClass } from "../../redux/actions/classActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";
//components
import VerticalHomeWork from "../../components/Vertical/VerticalHomeWork";
import { BASE_URL } from "../../../config";
import VerticalSelect from "../../components/Vertical/VerticalSelect";
import VerticalDefault from "../../components/Vertical/VerticalDefault";

const types = ["pdf", "doc", "mp3", "jpg", "png"];

const HomeWork = ({ route, navigation }) => {
  const { classId } = route?.params;
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { classes } = useSelector((state) => state.classReducer);
  const [selectedItem, setSelectItem] = useState(
    classes?.length > 0 ? classes[0] : -1
  );
  const [defaultValue, setDefaultValue] = useState(
    classes?.length > 0 ? classes[0] : null
  );

  const [isParam, setIsParam] = useState(true);

  const [data, setData] = useState([]);
  const video = React.useRef(null);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");

  const scrollViewRef = useRef();
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);
  const showArrowUp = useRef(new Animated.Value(0)).current;

  const handleShowModal = (value) => {
    if (typeof value == "string") {
      setShow(!show);
      setValue(value);
      types?.map((type, index) => {
        const checkType = value?.includes(type);
        if (checkType) {
          setType(type);
        }
      });
    } else {
      setShow(!show);
    }
  };

  useEffect(() => {
    dispatch(listClass(user?.id));
  }, [dispatch]);

  useEffect(() => {
    axios
      .post(
        BASE_URL + "sessions",
        {
          parent_id: user.id,
          class_id: selectedItem.id,
          student_id: selectedItem.student_id,
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
      })
      .catch((err) => {});
  }, [defaultValue, selectedItem]);

  useEffect(() => {
    if (classId != -1) {
      const index = classes.findIndex((item) => item.id == classId);
      if (index !== -1) {
        setSelectItem(classes[index]);
        setDefaultValue(classes[index]);
      }
      setIsParam(true);
    } else {
      setIsParam(false);
    }
  }, [classId]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      {isParam == true ? (
        <>
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
                setSelectItem(selectedItem);
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
                return (
                  <View style={{ justifyContent: "center", paddingTop: 4 }}>
                    <Text>
                      Lớp {selectedItem.name} - Năm học {selectedItem.year}
                    </Text>
                    <Text>Học sinh: {selectedItem.student_name}</Text>
                  </View>
                );
              }}
              rowTextForSelection={(item, index) => {
                return <VerticalSelect item={item} key={item.id} selectedItem={selectedItem}/>;
              }}
            />
          </View>
          <FlatList
            ref={scrollViewRef}
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
            style={{ backgroundColor: "white", zIndex: 10 }}
            data={data}
            renderItem={(item) => {
              if (!data && data.length <= 0) {
                return <VerticalDefault/>;
                } else {
                return <VerticalHomeWork item={item} handleShowModal={handleShowModal} show={show} />;
              
              }
            }}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={16}
          />
        </>
      ) : (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Chưa có thông tin tư liệu học tập
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeWork;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.spacing,
    zIndex: 1,
  },
  select: {
    width: "100%",
    borderRadius: SIZES.base,
    height: 56,
    marginTop: SIZES.padding,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 1,
    zIndex: 1,
    // marginHorizontal: SIZES.padding,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  upButtonStyle: {
    position: "absolute",
    width: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 10,
    zIndex: 100,
  },
  upButtonImageStyle: {
    width: 30,
    height: 30,
  },
  customSelect: { fontSize: 13, fontWeight: 700, color: "#637381" },
});
