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
  ActivityIndicator
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
  const navigation = useNavigation();
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    
  }, [user]);

  const renderItem = ({ item, index }) => {
    const date = moment(item.created_at).fromNow();

    const goToSitua = () => {
      item.type == 1 &&
        navigation.navigate("Trang chủ", {
          screen: "Tình hình học tập",
          initial: false,
          params: {
            classId: item.class_id,
          },
        });

      item.type == 2 &&
        navigation.navigate("Trang chủ", {
          screen: "Trang chính",
          initial: false,
          params: {
            dataSituation: item,
          },
        });

      item.type == 3 &&
        navigation.navigate("Học phí", {
          // screen: "Trang chính",
          initial: false,
          params: {
            dataSituation: item,
          },
        });
    };
    return (
      <TouchableOpacity onPress={goToSitua}>
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

      {loading == true ? (
        <View
          style={styles.loading}
        >
          <ActivityIndicator size={"small"} />
          <Text style={{textAlign: 'center'}}>  Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <FlatList
              data={data}
              inverted={true}
              listKey={(item, index) => `_key${index.toString()}`}
              keyExtractor={(item, index) => `_key${index.toString()}`}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
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
  loading :{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  }
});
