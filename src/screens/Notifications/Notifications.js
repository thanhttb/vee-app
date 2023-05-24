import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
//utils
import { COLORS, SIZES } from "../../utils/theme";

// redux
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../config";
import moment from "moment";

const Notifications = () => {
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.authReducer);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        BASE_URL + "notification",
        {
          parent_id: user.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  }, [user]);

  const renderItem = ({ item, index }) => {
    const date = moment(item.created_at).fromNow();
    return (
      <TouchableOpacity>
      <View style={styles.noti} key={index}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Text style={styles.name} ellipsizeMode="middle">
            {item.content}
          </Text>
          <Text style={styles.time}>{date}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="light-content" />

      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={data}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
          
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: SIZES.header,
    backgroundColor: COLORS.green,
  },
  textHeader: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    color: COLORS.white,
    paddingTop: SIZES.padding,
  },
  container: {
    padding: SIZES.padding,
  },
  noti: { flexDirection: "row", marginBottom: SIZES.padding },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  title: { fontSize: 14, color: COLORS.gray },
  name: {
    fontWeight: 500,
    maxWidth: SIZES.width - 100,
  },
  time: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
