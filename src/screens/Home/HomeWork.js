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

const types = ["pdf", "doc", "mp3", "jpg", "png"];

const HomeWork = () => {
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
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");

  const scrollViewRef = useRef();
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);
  const headerHeight = useRef(new Animated.Value(70)).current;
  const spacingHeight = useRef(new Animated.Value(10)).current;
  const showArrowUp = useRef(new Animated.Value(0)).current;

  const upButtonHandler = () => {
    scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
  };

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
      })
      .catch((err) => {});
  }, [defaultValue, selectedItem]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.container,
          { height: headerHeight, marginBottom: spacingHeight },
        ]}
      >
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
            return `Lớp ${selectedItem.name} - Năm học ${selectedItem.year}`;
          }}
          rowTextForSelection={(item, index) => {
            return `Lớp ${item.name} - Năm học ${item.year}`;
          }}
        />
      </Animated.View>
      <FlatList
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDireaction.current =
            offsetY - lastOffsetY.current > 0 ? "down" : "up";
          lastOffsetY.current = offsetY;
          if (scrollDireaction.current == "down" && offsetY >= 30) {
            Animated.timing(headerHeight, {
              toValue: 0,
              duration: 40,
              useNativeDriver: false,
            }).start();

            Animated.timing(spacingHeight, {
              toValue: 0,
              duration: 40,
              useNativeDriver: false,
            }).start();

            Animated.timing(showArrowUp, {
              toValue: 1,
              duration: 40,
              useNativeDriver: false,
            }).start();
          }
          if (scrollDireaction.current == "up" && offsetY < 30) {
            Animated.timing(headerHeight, {
              toValue: 70,
              duration: 40,
              useNativeDriver: false,
            }).start();

            Animated.timing(spacingHeight, {
              toValue: 10,
              duration: 40,
              useNativeDriver: false,
            }).start();

            Animated.timing(showArrowUp, {
              toValue: 0,
              duration: 40,
              useNativeDriver: false,
            }).start();
          }
          // animatedValue.setValue(offsetY);
        }}
        style={{ backgroundColor: "white", zIndex: 10 }}
        data={data}
        renderItem={(item) => (
          <VerticalHomeWork
            item={item}
            handleShowModal={handleShowModal}
            show={show}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEventThrottle={16}
      />

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={show}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </View>
      </Modal>

      <Animated.View 
       style={[styles.upButtonStyle, {opacity: showArrowUp }]}
       >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={upButtonHandler}
         
        >
          <Entypo
            name="chevron-up"
            size={36}
            color={COLORS.green}
            style={styles.upButtonImageStyle}
          />
        </TouchableOpacity>
      </Animated.View>
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
    borderWidth: 0.7,
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
    bottom:10,
    zIndex: 100,
  },
  upButtonImageStyle: {
    width: 30,
    height: 30,
  },
});
