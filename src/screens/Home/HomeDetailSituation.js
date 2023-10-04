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
  Platform,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { Audio, Video as OriginalVideo, ResizeMode } from "expo-av";
import * as Linking from "expo-linking";
import { useSelector } from "react-redux";

import ButtonComponent from "../../components/Button/Button";
import Spacer from "../../components/Spacer";
import axios from "axios";

const types = ["pdf", "doc", "mp3", "jpg", "png"];
const imagesPath = {
  docx: require("../../../assets/folder/image_docx.png"),
  ".mp3": require("../../../assets/folder/image_mp3.png"),
  ".pdf": require("../../../assets/folder/image_pdf.png"),
  ".png": require("../../../assets/folder/image_png.png"),
  ".jpg": require("../../../assets/folder/image_png.png"),
};
const triggerAudio = async (ref) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  ref.current.playAsync();
};

const HomeDetailSituation = ({ route, navigation }) => {
  const { authToken, user } = useSelector((state) => state.authReducer);
  const { id, data } = route.params;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState({});
  const [emailParent, setEmailParent] = useState(user.email);
  const [keyboardStatus, setKeyboardStatus] = useState("");
  const [loading, setLoading] = useState(false);

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

  const postEmailParent = async () => {
    setLoading(true);
    axios
      .post(
        "https://api.vietelite.edu.vn/api/session/send-email",
        {
          session_id: data.session_id,
          email: emailParent,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        console.log("res");
        setActive(false);
        setLoading(false);
        Alert.alert(
          "VietElite",
          "Gửi thành công, vui lòng kiểm tra hòm thư",
          [
            // { text: "Để sau", onPress: () => console.log("OK Pressed") },
            {
              text: "Xác nhận",
              
            },
          ],
          {
            userInterfaceStyle: "light",
          }
        );
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        Alert.alert(
          "VietElite",
          "Gửi thất bại, vui lòng kiểm tra lại",
          [
            // { text: "Để sau", onPress: () => console.log("OK Pressed") },
            {
              text: "Xác nhận",
              
            },
          ],
          {
            userInterfaceStyle: "light",
          }
        );
      });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.container}>
            <View style={{ marginHorizontal: SIZES.padding }}>
              <Text style={styles.title}>Nội dung ca học</Text>
              <Text style={{ paddingVertical: 4 }}>{data?.content}</Text>

              <View style={styles.boxs}>
                {data?.documents?.map((item, index) => {
                  let myArray = item.split("/");
                  const last3 = item.slice(-4);
                  const imagePath = imagesPath[last3];

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        Platform.OS === "ios"
                          ? handleShowModal(item)
                          : Linking.openURL(item)
                      }
                      key={index}
                    >
                      <View
                        style={[
                          styles.box,
                          index === data.documents.length - 1
                            ? styles.lastBox
                            : null,
                        ]}
                      >
                        {last3 && (
                          <Image
                            style={styles.folder_icon}
                            source={imagePath}
                          />
                        )}

                        <Text style={styles.textBox}>{myArray[8]}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.title}>Bài tập về nhà</Text>
              <Text style={{ paddingVertical: 4 }}>{data?.btvn_content}</Text>
              <View style={styles.boxs}>
                {data?.exercices?.map((item, index) => {
                  let myArray = item.split("/");
                  const last3 = item.slice(-4);
                  const imagePath = imagesPath[last3];
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        Platform.OS === "ios"
                          ? handleShowModal(item)
                          : Linking.openURL(item)
                      }
                      key={index}
                    >
                      <View
                        style={[
                          styles.box,
                          index === data.exercices.length - 1
                            ? styles.lastBox
                            : null,
                        ]}
                      >
                        {last3 && (
                          <Image
                            style={styles.folder_icon}
                            source={imagePath}
                          />
                        )}
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
                  <WebView
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
                  <WebView
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
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "contain",
                    }}
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
                      onPlaybackStatusUpdate={(status) =>
                        setStatus(() => status)
                      }
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

          <View
            style={{
              position: "absolute",
              bottom: keyboardStatus == "Keyboard Shown" ? 100 : 10,
              width: "100%",
            }}
          >
            <View style={{ marginHorizontal: SIZES.padding }}>
              {active == true ? (
                <>
                  <View style={styles.input}>
                    <TextInput
                      style={{ width: "100%" }}
                      placeholder={"Nhập Email nhận tài liệu"}
                      placeholderTextColor={COLORS.gray}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      defaultValue={emailParent}
                      value={emailParent}
                      onChangeText={(text) => setEmailParent(text)}
                    />
                  </View>
                  <Spacer height={10} />
                  <ButtonComponent
                    label={"Xác nhận gửi"}
                    color={COLORS.white}
                    background={COLORS.green}
                    onPress={postEmailParent}
                  />
                </>
              ) : (
                <ButtonComponent
                  label={"Gửi tài liệu buổi học qua Email"}
                  color={COLORS.white}
                  background={COLORS.green}
                  onPress={() => setActive(true)}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeDetailSituation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: SIZES.padding,
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
    paddingRight: 16,
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
  folder_icon: { width: 24, height: 24, resizeMode: "contain" },
  input: {
    flexDirection: "row",
    borderRadius: SIZES.base,
    height: SIZES.spacing * 5,
    borderWidth: 1,
    padding: SIZES.spacing,
    borderColor: COLORS.green,
  },
});
