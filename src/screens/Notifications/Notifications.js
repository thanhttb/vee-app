import React from "react";
import { StatusBar } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { ScrollView } from "react-native";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const Notifications = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="light-content" />

      <View style={{ flex: 1}}>
        <View style={styles.container}>
          <FlatList
            data={array}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ arr, i }) => (
              <View style={styles.noti} key={arr}>
                <Image
                  style={styles.avatar}
                  source={require("../../../assets/avatar_default.jpg")}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={styles.title}>
                    <Text style={styles.name}>
                      Giáo viên đã duyệt đơn xin nghỉ
                    </Text>{" "}
                    If you are going to use a passage of Lorem Ipsum, you
                  </Text>
                  <Text style={styles.time}>2 giờ trước</Text>
                </View>
              </View>
            )}
          />
          {/* <ScrollView style={{ flex: 1}}>
            {array.map((arr, i) =>{
              return (
                <View style={styles.noti} key={arr}>
                <Image
                  style={styles.avatar}
                  source={require("../../../assets/avatar_default.jpg")}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={styles.title}>
                    <Text style={styles.name}>
                      Giáo viên đã duyệt đơn xin nghỉ
                    </Text>{" "}
                    If you are going to use a passage of Lorem Ipsum, you
                  </Text>
                  <Text style={styles.time}>2 giờ trước</Text>
                </View>
              </View>
              )
            })}
          </ScrollView> */}
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
    margin: SIZES.padding,
  },
  noti: { flexDirection: "row", marginBottom: SIZES.padding },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  title: { fontSize: 14, color: COLORS.gray },
  name: {
    fontWeight: 600,
    color: "black",
  },
  time: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
