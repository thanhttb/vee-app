import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Button,
  Linking,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Toast, { DURATION } from "react-native-easy-toast";
//utils
import { COLORS, SIZES } from "../../utils/theme";
const data = [
  {
    id: 1,
    title: "Nguyễn Văn A lớp TC9.1 học phí thu học phí môn Toán",
    time: "04/05/2023",
    money: 4500000,
  },
  {
    id: 2,
    title: "Nguyễn Văn B lớp TC9.1 học phí thu",
    time: "04/05/2023",
    money: -2500000,
  },
  {
    id: 2,
    title: "Nguyễn Văn B lớp TC9.1 học phí thu",
    time: "04/05/2023",
    money: 2500000,
  },
  {
    id: 2,
    title: "Nguyễn Văn B lớp TC9.1 học phí thu",
    time: "04/05/2023",
    money: 2500000,
  },
  {
    id: 2,
    title: "Nguyễn Văn B lớp TC9.1 học phí thu",
    time: "04/05/2023",
    money: 2500000,
  },
  {
    id: 2,
    title: "Nguyễn Văn B lớp TC9.1 học phí thu",
    time: "04/05/2023",
    money: 2500000,
  },
];
const HomeTuition = () => {
  const navigation = useNavigation();
  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };

  const money = 123456789;
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(money);

  const VerticalStatistical = ({ item }) => {
    const config = {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 9,
    };
    const formated = new Intl.NumberFormat("vi-VN", config).format(item.money);
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#EDEFF1",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chi tiết học phí", {
              id: 1,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: SIZES.padding,
            }}
          >
            <View style={{ width: "65%" }}>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.gray, paddingTop: 2 }}>
                {item.time}
              </Text>
            </View>
            <View>
              <Text
                style={item.money > 0 ? { color: "#005AA9" } : { color: "red" }}
              >
                {formated}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Tổng tiền  */}
        <LinearGradient
          style={styles.containerSum}
          colors={["rgba(116, 208, 104, 1)", "rgba(8, 225, 174, 0.5)"]}
          start={{ x: 0.35, y: 0.2 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.sumTop}>
            <View style={styles.sumTopLeft}>
              <Text style={styles.textSum}>Số tiền cần đóng</Text>
              <Text style={[styles.textSum, { fontSize: 24, fontWeight: 500 }]}>
                {formated}
              </Text>
            </View>

            <View style={styles.sumTopRight}>
              <Text style={styles.textSum}>Hạn thanh toán</Text>
              <Text style={[styles.textSum, { textAlign: "right" }]}>
                15/06/2023
              </Text>
            </View>
          </View>
          <Text style={[styles.textSum, { fontSize: 10 }]}>
            Mọi thắc mắc vui lòng liên hệ theo số Hotline
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("tel:02473065565");
              }}
            >
              <Text style={styles.textPhone}>
                024.730.65565 <Feather name="copy" size={10} color="white" />
              </Text>
            </TouchableOpacity>
          </Text>
        </LinearGradient>

        {/* Thông tin chuyển khoản  */}
        <View style={styles.containerInfo}>
          <Text style={styles.title}>Thông tin chuyển khoản</Text>
          <View style={styles.viewComponent}>
            <View style={styles.viewInfoLeft}>
              <View style={{ flexDirection: "column", gap: 10, marginTop: 4 }}>
                <Text style={styles.textInfoLeft}>Ngân hàng</Text>
                <Text style={styles.textInfoLeft}>Số tài khoản</Text>
                <Text style={styles.textInfoLeft}>Chủ tài khoản</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 10, marginTop: 4 }}>
                <Text style={styles.textInfoRight}>ACB</Text>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard("12479287484"),
                      this.toast.show("Copy thành công", 1500);
                  }}
                  on
                >
                  <Text style={styles.textInfoRight}>
                    12479287484 <Feather name="copy" size={12} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.textInfoRight}>Phan Việt Anh</Text>
              </View>
            </View>

            <View style={styles.viewInfoRight}>
              <Image source={require("../../../assets/qr_vnpay.jpg")} />
            </View>
          </View>
        </View>

        {/* Bảng thống kê chi tiết  */}
        <View style={[styles.containerInfo, { flex: 1 }]}>
          <Text style={styles.title}>Bảng thống kê chi tiết</Text>
          <View style={[styles.viewComponentStatistical]}>
            <FlatList
              data={data}
              renderItem={({ item }) => <VerticalStatistical item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>

      <Toast
        ref={(toast) => (this.toast = toast)}
        style={{ backgroundColor: "white" }}
        position="top"
        positionValue={30}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: "black" }}
      />
    </View>
  );
};

export default HomeTuition;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: SIZES.padding,
    flex: 1,
    flexDirection: "column",
  },
  containerSum: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.green,
    height: 104,
    width: "100%",
    padding: SIZES.spacing,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sumTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSum: {
    color: COLORS.white,
    fontSize: 15,
    paddingTop: 2,
  },
  textPhone: {
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 2,
    top: 5,
    color: "white",
  },
  containerInfo: {
    marginTop: SIZES.spacing,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  textInfoRight: {
    // marginLeft: 10
  },
  viewComponent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 106,
    marginTop: 8,
    padding: SIZES.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewComponentStatistical: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 8,
    flexDirection: "row",
    flex: 1,
  },
  viewInfoLeft: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  textInfoLeft: {
    color: COLORS.gray,
  },
});
