import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import PDFReader from "rn-pdf-reader-js";
import { Audio, Video as OriginalVideo, ResizeMode } from "expo-av";

const types = ["pdf", "doc", "mp3", "jpg", "png"];
const triggerAudio = async (ref) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  ref.current.playAsync();
};

const HomeDetailSituation = ({ route, navigation }) => {
  const { id, data } = route.params;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const ref = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (status.isPlaying) triggerAudio(ref);
  }, [ref, status.isPlaying]);

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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ margin: SIZES.padding }}>
          <Text style={styles.title}>{data?.content}</Text>

          <View style={styles.boxs}>
            {data?.documents?.map((item, index) => {
              let myArray = item.split("/");
              return (
                <TouchableOpacity
                  onPress={() => handleShowModal(item)}
                  key={index}
                >
                  <View 
                  style={[
                    styles.box,
                    index === (data.documents.length - 1) ? styles.lastBox : null,
                  ]}>
                    <FontAwesome
                      name="folder"
                      size={28}
                      color={`${COLORS.green}`}
                    />
                    <Text style={styles.textBox}>{myArray[8]}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.boxs}>
            {data?.exercices?.map((item, index) => {
              let myArray = item.split("/");
              return (
                <TouchableOpacity
                  onPress={() => handleShowModal(item)}
                  key={index}
                >
                  <View
                    style={[
                      styles.box,
                      index === (data.exercices.length - 1) ? styles.lastBox : null,
                    ]}
                  >
                    <FontAwesome
                      name="folder"
                      size={28}
                      color={`${COLORS.green}`}
                    />
                    <Text style={styles.textBox}>{myArray[8]}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={show}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {show && (
          <>
            <TouchableOpacity onPress={handleShowModal}>
              <Ionicons
                name="close"
                size={30}
                color="black"
                style={{
                  paddingTop: 40,
                  textAlign: "right",
                  paddingRight: 30,
                }}
              />
            </TouchableOpacity>
            {type == "doc" && (
              <PDFReader
                customStyle={{
                  readerContainerNavigateArrow: true,
                  readerContainerNavigate: true,
                }}
                style={{ flex: 1 }}
                source={{
                  uri: value,
                }}
              />
            )}

            {type == "pdf" && (
              <PDFReader
                customStyle={{
                  readerContainerNavigateArrow: true,
                  readerContainerNavigate: true,
                }}
                style={{ flex: 1 }}
                source={{
                  uri: value,
                }}
              />
            )}

            {type == "png" && (
              <Image
                source={{ uri: value }}
                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
              />
            )}

            {type == "mp3" && (
              <>
                <OriginalVideo
                  ref={ref}
                  style={styles.video}
                  source={{
                    uri: value,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                  playsInSilentLockedModeIOS={true}
                  ignoreSilentSwitch={"ignore"}
                />
                <View style={styles.buttons}>
                  <Button
                    title={status.isPlaying ? "Pause" : "Play"}
                    onPress={() =>
                      status.isPlaying
                        ? ref.current.pauseAsync()
                        : ref.current.playAsync()
                    }
                  />
                </View>
              </>
            )}
          </>
        )}
      </Modal>
    </View>
  );
};

export default HomeDetailSituation;

const styles = StyleSheet.create({
  container: {
    // margin: SIZES.padding,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  desc: {
    paddingVertical: 10,
  },
  boxs: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 8,
  },
  box: {
    padding: SIZES.spacing,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#EDEFF1",
    borderBottomWidth: 1,
  },
  lastBox: {
    padding: SIZES.spacing,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    // backgroundColor: 'red'
  },
  image: {
    height: 30,
    width: 30,
  },
  textBox: {
    color: COLORS.gray,
    fontSize: 13,
    paddingLeft: SIZES.spacing,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
    marginTop: SIZES.height / 4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
