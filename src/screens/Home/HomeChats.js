import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image
  // Keyboard
} from "react-native";
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../utils/theme";

import firestore from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../config";

const avatar = require("../../../assets/avatar_gv.jpg");

const HomeChats = ({ route, navigation }) => {
  const { teacher_id } = route?.params;
  const textInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");
  const { authToken, user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    navigation.setOptions({
      title: `Liên hệ giáo viên`,
    });
  }, [navigation]);

  useEffect(() => {
    const chatId = getChatId();

    const unsubscribe = firestore
      .collection("chats")
      .doc(chatId)
      .onSnapshot((snapshot) => {
        const chatData = snapshot.data();
        if (chatData) {
          // Sắp xếp messages theo createdAt
          const sortedMessages = chatData.messages.sort(
            (a, b) => b.createdAt - a.createdAt
          );
          setMessages(sortedMessages);
        } else {
          setMessages([]);
        }
      });

    return () => unsubscribe();
  }, []);

  const getChatId = () => {
    const currentUserUid = user.id; // Thay thế bằng ID của người dùng hiện tại
    const otherUserUid = teacher_id;
    const chatId = [currentUserUid, otherUserUid].sort().join("-");
    return chatId;
  };

  const onSend = (newMessages = []) => {
    const chatId = getChatId();
    const message = newMessages[0];

    const chatRef = firestore.collection("chats").doc(chatId);

    chatRef.get().then((snapshot) => {
      if (snapshot.exists) {
        chatRef.update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            ...message,
            createdAt: new Date().getTime(), // Thời gian gửi tin nhắn (timestamp)
          }),
        });
      } else {
        chatRef.set({
          id: chatId,
          participants: [teacher_id, user.id], // Thay thế bằng ID của người dùng hiện tại
          messages: [
            {
              ...message,
              createdAt: new Date().getTime(),
            },
          ],
        });
      }
    });
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginTop: -10}}>
          <Ionicons name="md-send" size={32} color={COLORS.green} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.green,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.white,
          },
        }}
      />
    );
  };

  const renderTicks = (currentMessage) => {
    const { user } = currentMessage;
    if (user._id === 1) {
      // This is the local user's message
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {currentMessage.sent && <Text style={{ marginRight: 5 }}>✓</Text>}
          {currentMessage.received && <Text style={{ marginRight: 5 }}>✓</Text>}
          {currentMessage.pending && <Text style={{ marginRight: 5 }}>🕓</Text>}
        </View>
      );
    }
    // This is a received message
    return null;
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          marginLeft: 10,
          marginRight: 10,
          paddingTop: 6,
          backgroundColor: COLORS.background,
          alignContent: "center",
          justifyContent: "center",
          borderWidth: 0,
          borderRadius: SIZES.radius,
          borderTopColor: "transparent",
        }}
      />
    );
  };

  const renderAvatar = (props) => {
    return (
      <Image
        style={{
          height: 36,
          width: 36,
          borderRadius: 50,
        }}
        source={avatar}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  useEffect(() => {
    if (chat) {
      const dataSync = async () => {
        await axios
          .post(
            BASE_URL + "chat/sync",
            {
              parent_id: user.id,
              teacher_id: teacher_id,
              chat: chat[0]?.text,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
              },
            }
          )
          .catch((err) => console.log("err", err))
          .then(setChat(null));
      };
      dataSync();
    }
  }, [chat]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* <View style={{ backgroundColor: COLORS.white, height: SIZES.height }}> */}
        <View style={styles.component}>
          <View
            style={[
              styles.chatContainer,
              Platform.OS === "android"
                ? { maxHeight: SIZES.height - 120 }
                : { maxHeight: SIZES.height - 180 },
            ]}
          >
            <GiftedChat
              messages={messages}
              onSend={(messages) => {
                setChat(messages);
                onSend(messages);
              }}
              user={{
                _id: user.id,
              }}
              renderBubble={renderBubble}
              renderTicks={renderTicks}
              placeholder="Gửi tin nhắn ..."
              isKeyboardInternallyHandled={true}
              isLoadingEarlier={true}
              alwaysShowSend
              keyboardShouldPersistTaps="handled"
              renderSend={renderSend}
              renderInputToolbar={renderInputToolbar}
              textInputRef={(ref) => (textInputRef.current = ref)}
              scrollToBottom
              scrollToBottomComponent={scrollToBottomComponent}
              bottomOffset={80} 
              renderAvatar={renderAvatar}
            />
            {Platform.OS === "android" ? (
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={30}
              />
            ) : (
              <KeyboardAvoidingView
                behavior="height"
                keyboardVerticalOffset={0}
              />
            )}
            {/* </ScrollView> */}
          </View>
        </View>
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      {/* </KeyboardAvoidingView> */}
    </SafeAreaProvider>
  );
};

export default HomeChats;

const styles = StyleSheet.create({
  component: {
    flex: 1,
    borderTopColor: COLORS.background,
    borderTopWidth: 1,
  },
  chatContainer: {
    flex: 1,
  },
  imageAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  titleHeader: {
    fontWeight: 600,
    fontSize: SIZES.fs16,
  },
  titles: {
    borderBottomColor: COLORS.background,
    paddingVertical: 4,
  },
  title: {
    fontSize: SIZES.fs14,
  },
  number: {
    fontSize: SIZES.fs14,
    color: COLORS.gray,
  },
});
