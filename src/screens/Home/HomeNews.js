import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";

// redux
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { listClass } from "../../redux/actions/classActions";
import { BASE_URL } from "../../../config";
//components
import VerticalPostCard from "../../components/Vertical/VerticalPostCard";

const renderItem = ({ item, index }) => (
  <VerticalPostCard item={item} key={index} />
);

export default function HomeNews() {
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const { classes } = useSelector((state) => state.classReducer);

  const [dataPost, setDataPost] = useState();
  const [arrClass, setArrClass] = useState();

  useEffect(() => {
    dispatch(listClass(user?.id));
  }, [dispatch]);

  useEffect(() => {
    const idArray = classes.map((item) => item.id);
    setArrClass(idArray);
  }, [classes]);

  useEffect(() => {
    axios
      .post(
        BASE_URL + "feed/get",
        {
          parent_id: user.id,
          class_ids: arrClass,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        setDataPost(response.data);
      })
      .catch((err) => {});
  }, [arrClass]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, flexGrow: 1, backgroundColor: "red" }}>
          <FlatList
            data={dataPost}
            renderItem={renderItem}
            style={{ flex: 1, paddingBottom: 20, backgroundColor: "white" }}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </View>
      </View>
    </>
  );
}
