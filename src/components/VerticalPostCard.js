import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import HTMLView from "react-native-htmlview";

import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomComment from "./CustomComment";

import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";

const VerticalPostCard = ({ item }) => {
  const { user, authToken } = useSelector((state) => state.authReducer);

  const date = moment(item.time).fromNow();
  const dateNow = new Date();
  const [like, setLike] = useState(item.reactions.length);
  const [isLike, setIsLike] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(item.comments);


  useEffect(() => {
    const isLiked = item.reactions.some((item) => item.parent_id == user.id);
    setIsLike(isLiked);
  }, [user]);

  const handleLike = () => {
    axios
      .post(
        BASE_URL + "feed/reaction",
        {
          parent_id: user.id,
          feed_id: item.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        if(isLike) {
          setLike(like-1)
        }else {
          setLike(like+1)
        }
        setIsLike(!isLike);
      })
      .catch((err) => {});
  };

  const hanldeComment = () => {
    axios
      .post(
        BASE_URL + "feed/comment",
        {
          parent_id: user.id,
          feed_id: item.id,
          content: comment,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        setComments([
          {
            created_at: dateNow,
            name: user.fullname,
            content: comment,
            avatar:
              "http://center.vietelite.edu.vn/public/images/avatar_ph.png",
          },
          ...comments,
        ]);
        setComment("");
      })
      .catch((err) => {});
  };

  const showComments = () => {
    setIsComment(!isComment);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header  */}
        <View style={styles.header}>
          <Image source={{ uri: item.avatar }} style={styles.imageHeader} />
          <View style={styles.headerRight}>
            <View style={styles.headerRightTop}>
              <Text style={{ fontWeight: 500, fontSize: 18 }}>{item.name}</Text>

              {item.type == 1 && (
                <View
                  style={{
                    backgroundColor: COLORS.green,
                    borderRadius: SIZES.radius,
                    marginLeft: SIZES.base,
                  }}
                >
                  <Text style={styles.type}>Thông báo</Text>
                </View>
              )}
            </View>

            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        {/* Content  */}
        <View style={{ padding: SIZES.padding }}>
          <Text style={styles.title}>{item.content}</Text>
          <HTMLView value={item?.description} />
        </View>
        {
          item.file &&
          <Image source={{ uri: item.file }} style={styles.file} />
        }
       

        {/* Actions  */}
        <View>
          <View style={styles.interact}>
            <Text>{like} lượt thích</Text>
            <Text>{comments.length} Bình luận</Text>
          </View>
          <View style={styles.action}>
            <TouchableOpacity
              onPress={handleLike}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {isLike == false ? (
                <>
                  <AntDesign name="like2" size={24} color="black" />
                  <Text style={{ paddingLeft: 4 }}>Thích</Text>
                </>
              ) : (
                <>
                  <AntDesign name="like1" size={24} color="#2078F4" />
                  <Text style={{ paddingLeft: 4, color: "#2078F4" }}>
                    Thích
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showComments}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesome name="comment-o" size={24} color="black" />
              {/* <FontAwesome name="comment" size={24} color="#2078F4" /> */}
              <Text style={{ paddingLeft: 4 }}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments  */}
        {isComment && (
          <View
            style={styles.comments}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {item.avatar && (
                  <Image
                    source={{
                      uri: 'http://center.vietelite.edu.vn/public/images/avatar_ph.png',
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                    }}
                  />
                )}
                <View style={{ flex: 2, marginLeft: 10 }}>
                  <TextInput
                    style={styles.InputField}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                    placeholder="Nhập bình luận..."
                    keyboardType="default"
                    placeholderTextColor={"gray"}
                    returnKeyType="done"
                    multiline={true}
                    blurOnSubmit={true}
                    onBlur={() => {
                      Keyboard.dismiss();
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.InputSend}
                  onPress={hanldeComment}
                >
                  <Ionicons
                    name="send"
                    size={24}
                    justifyContent="center"
                    color="#10C45C"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              {comments?.map((item, index) => (
                <CustomComment key={index} item={item} />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default VerticalPostCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.padding,
    marginTop: 18,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {},
  header: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  imageHeader: {
    height: 40,
    width: 40,
  },
  headerRight: {
    marginLeft: 10,
  },
  headerRightTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    paddingBottom: 4,
  },
  file: {
    // marginTop: 4,
    height: (SIZES.width - (SIZES.padding *2)) * 9 / 16,
    width: SIZES.width - (SIZES.padding *2),
    resizeMode: "cover",
  },
  interact: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
  },
  comments : {
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: COLORS.input,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: COLORS.input,
    paddingVertical: 12,
  },
  InputField: {
    borderColor: "#eeeeee",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    width: "98%",
    borderRadius: 8,
    height: 40,
  },
  InputSend: {
    backgroundColor: "#F6F7F8",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  TextInput: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    textAlignVertical: "center",
    borderColor: "#bcbcbc",
    placeholderTextColor: "grey",
  },
});
