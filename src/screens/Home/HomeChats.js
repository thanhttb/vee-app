import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import {
  Bubble,
  GiftedChat,
  Send,
  Avatar,
  InputToolbar,
  
} from "react-native-gifted-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";

import firestore from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const itemUser = {"email": "truong@gmail.com", "id": "2", "name": "Truong"}

const HomeChats = ({ route, navigation }) => {
  const { data } = route?.params;
  const textInputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      title: `Liên hệ giáo viên ${data?.teacher}`
    })
  },[navigation])

  useEffect(() => {
    const chatId = getChatId();

    const unsubscribe = firestore
      .collection("messages")
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
    const currentUserUid = itemUser.id; // Thay thế bằng ID của người dùng hiện tại
    const otherUserUid = 1;
    const chatId = [currentUserUid, otherUserUid].sort().join("-");
    return chatId;
  };

  const onSend = (newMessages = []) => {
    const chatId = getChatId();
    const message = newMessages[0];

    const chatRef = firestore.collection("messages").doc(chatId);

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
          participants: [1, itemUser.id], // Thay thế bằng ID của người dùng hiện tại
          messages: [
            {
              ...message,
              createdAt: new Date().getTime(),
            },],
        });
      }
    });
  };

  

  const renderSend = (props) => {
    return (
      <Send {...props} >
        <View>
          <Ionicons name="md-send" size={32}
            color={COLORS.green} />
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

  const handleTitle = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  const renderAvatar = (props) => {
    return (
      <TouchableOpacity
        onPress={handleTitle}
        style={{ borderRadius: 20, overflow: "hidden" }}
      >
        <Image
          source={{ uri: props.currentMessage?.user?.avatar }}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>
    );
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
          // marginBottom: 4,
          // marginVertical: 10
        }}
      />
    );
  };
  
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
            
                <GiftedChat
                  messages={messages}
                  onSend={(messages) => onSend(messages)}
                  user={{
                    _id: 1,
                  }}
                  renderBubble={renderBubble}
                  renderTicks={renderTicks}
                  placeholder="Gửi tin nhắn ..."
                  isKeyboardInternallyHandled={true}
                  isLoadingEarlier={true}
                  alwaysShowSend
                  keyboardShouldPersistTaps="handled"
                  renderAvatar={renderAvatar}
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
  chatContainer: {
    flex: 1,
    maxHeight: SIZES.height * 0.64,
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