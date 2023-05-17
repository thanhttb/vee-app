import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  Modal,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
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
import VerticalHomeWork from "../../components/VerticalHomeWork";
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
  const [recording, setRecording] = React.useState();

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
      <View style={styles.container}>
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
      </View>
      <FlatList
        style={{ marginTop: SIZES.spacing }}
        data={data}
        renderItem={(item) => <VerticalHomeWork item={item} handleShowModal={handleShowModal} show={show}/>}
        keyExtractor={(item, index) => index.toString()}
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
    </View>
  );
};

export default HomeWork;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: SIZES.padding,
  },
  select: {
    width: "100%",
    borderRadius: SIZES.base,
    height: 56,
    marginTop: SIZES.padding,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 0.7,
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
});
