import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import {
  Bubble,
  GiftedChat,
  Send,
  Avatar,
  InputToolbar,
} from "react-native-gifted-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";

import firestore from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../config";

const itemUser = { email: "truong@gmail.com", id: "2", name: "Truong" };

const HomeChats = ({ route, navigation }) => {
  const { teacher_id } = route?.params;
  const textInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState('')
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
        <View>
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

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  useEffect(() => {
    if(chat){
      const dataSync = async() => {
        await axios.post(BASE_URL+"chat/sync", {
          parent_id : user.id,
          teacher_id: teacher_id,
          chat: chat[0]?.text
        },
        {
          headers: {
            Accept: "application/json",
          Authorization: "Bearer " + authToken,
          }
        }).catch(err=> console.log('err', err))
        .then(setChat(null))
      }
      dataSync()
    }
  }, [chat])

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) =>{
        setChat(messages)
        onSend(messages)
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
    />
  );
};

export default HomeChats;

const styles = StyleSheet.create({
  header: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    margin: SIZES.margin,
  },
  component: {
    flex: 1,
    borderTopColor: COLORS.background,
    borderTopWidth: 1,
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
});
