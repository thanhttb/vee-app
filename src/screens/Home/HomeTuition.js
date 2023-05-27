import React, { useState, useEffect } from "react";
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
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Toast, { DURATION } from "react-native-easy-toast";
import SelectDropdown from "react-native-select-dropdown";
//redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { userReceipt } from "../../redux/actions/userActions";
import { userList } from "../../redux/actions/userActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import axios from "axios";
import { BASE_URL } from "../../../config";


const HomeTuition = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { receipt, users } = useSelector((state) => state.userReducer);
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [sumReceipt, setSumReceipt] = useState();
  const [data, setData] = useState();
  const [selectedItem, setSelectItem] = useState(
    users?.length > 0 ? users[0].id : 0
  );
  const [defaultValue, setDefaultValue] = useState(
    users?.length > 0 ? users[0] : null
  );

  useEffect(() => {
    dispatch(userReceipt(selectedItem));
  }, [dispatch, selectedItem]);

  useEffect(() => {
    setData(receipt)
  }, [receipt])

  useEffect(() =>{
    setSelectItem(users?.length > 0 ? users[0].id : 0)
    setDefaultValue(users?.length > 0 ? users[0] : null)
  }, [users])

  useEffect(() =>{
    dispatch(userList(user.id))
  }, [dispatch])

  useEffect(() => {
    setSumReceipt(data?.amount_total);
  }, [receipt]);

  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(sumReceipt);

  const VerticalStatistical = ({ item }) => {
    const config = {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 9,
    };
    const formated = new Intl.NumberFormat("vi-VN", config).format(item.amount);
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
              item: item,
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
              <Text numberOfLines={2} ellipsizeMode="tail">
                {item.student_name} - {item.content}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.gray, paddingTop: 2 }}>
                {item.time}
              </Text>
            </View>
            <View>
              <Text
                style={
                  item.amount > 0 ? { color: "#005AA9" } : { color: "red" }
                }
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
        <SelectDropdown
          data={users}
          buttonStyle={styles.select}
          dropdownStyle={{
            borderRadius: 8,
          }}
          defaultButtonText={"Chọn học sinh"}
          buttonTextStyle={styles.customText}
          defaultValue={defaultValue}
          // defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            setSelectItem(selectedItem.id);
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#637381"}
                size={14}
                style={{ marginRight: 10 }}
              />
            );
          }}
          dropdownIconPosition={"right"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return `Học sinh ${selectedItem.fullname}`;
          }}
          rowTextForSelection={(item, index) => {
            return `Học sinh ${item.fullname}`;
          }}
        />
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
                024.730.65565{" "}
                <Feather name="phone-call" size={10} color="white" />
              </Text>
            </TouchableOpacity>
          </Text>
        </LinearGradient>

        {/* Thông tin chuyển khoản  */}
        <View style={styles.containerInfo}>
          <Text style={styles.title}>Thông tin chuyển khoản</Text>
          <View style={styles.viewComponent}>
            <View style={styles.viewInfoLeft}>
              <View style={{ flexDirection: "column", gap: 8, marginTop: 4, width: '35%' }}>
                <Text style={styles.textInfoLeft}>Ngân hàng</Text>
                <Text style={styles.textInfoLeft}>Số tài khoản</Text>
                <Text style={styles.textInfoLeft}>Chủ tài khoản</Text>
                <Text style={styles.textInfoLeft}>Nội dung chuyển khoản</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 8, marginTop: 4, width: '65%' }}>
                <Text style={styles.textInfoRight}>{data?.bank_code}</Text>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(`${data?.bank_number}`),
                      this.toast.show("Copy thành công", 1500);
                  }}
                  on
                >
                  <Text style={styles.textInfoRight}>
                    {data?.bank_number}{" "}
                    <Feather name="copy" size={12} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.textInfoRight}>{data?.bank_owner}</Text>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(`${data?.total_content}`),
                      this.toast.show("Copy thành công", 1500);
                  }}
                  on
                >
                  <Text style={styles.textInfoRight}>
                    {data?.total_content}{" "}
                    <Feather name="copy" size={12} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.viewInfoRight}>
              <Image source={{ uri: data?.bank_qr }} />
            </View> */}
          </View>
        </View>

        {/* Bảng thống kê chi tiết  */}
        <View style={[styles.containerInfo, { flex: 1 }]}>
          <Text style={styles.title}>Bảng thống kê chi tiết</Text>
          <View style={styles.viewComponentStatistical}>
            <FlatList
              data={data?.detail}
              renderItem={({ item }) => <VerticalStatistical item={item} />}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => {
                return (
                  <>
                    <View style={styles.option}>
                      <Text>Tất cả</Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="options-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
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
  select: {
    width: "100%",
    borderRadius: SIZES.base,
    marginBottom: SIZES.padding,
    borderColor: COLORS.input,
    backgroundColor: "white",
    borderWidth: 0.7,
    zIndex: 1,
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
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEFF1",
  },
  viewComponent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // height: 120,
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
  },
  textInfoLeft: {
    color: COLORS.gray,
    // paddingRight: SIZES.padding
  },
});
