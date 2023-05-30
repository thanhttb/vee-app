import React, { useState, useEffect, useMemo, useRef } from "react";
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
  Animated,
  Modal,
  Alert,
} from "react-native";
import { Ionicons, Feather, FontAwesome, Entypo } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Toast, { DURATION } from "react-native-easy-toast";
import SelectDropdown from "react-native-select-dropdown";
import RadioGroup from "react-native-radio-buttons-group";
//redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { userReceipt } from "../../redux/actions/userActions";
import { userList } from "../../redux/actions/userActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";

const radioButtonsData = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Tất cả",
    value: "all",
  },
  {
    id: "2",
    label: "Học phí thu",
    value: "minus",
  },
  {
    id: "3",
    label: "Chưa thanh toán",
    value: "plus",
  },
];

const HomeTuition = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { receipt, users, amount_total, bank } = useSelector(
    (state) => state.userReducer
  );
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [sumReceipt, setSumReceipt] = useState(0);
  const [data, setData] = useState();
  const [selectedItem, setSelectItem] = useState(
    users?.length > 0 ? users[0].id : 0
  );
  const [defaultValue, setDefaultValue] = useState(
    users?.length > 0 ? users[0] : null
  );
  const [isModal, setIsModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData[0].label);
  const [filterData, setFilterData] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const listViewRef = useRef(null);
  const lastOffsetY = useRef(0);
  const scrollDireaction = useRef(0);
  const showArrowUp = useRef(new Animated.Value(0)).current;

  const upButtonHandler = () => {
    listViewRef.current?.scrollTo({ offset: 0, animated: true });
  };

  useEffect(() => {
    dispatch(userReceipt(selectedItem));
  }, [dispatch, selectedItem]);

  useEffect(() => {
    const startImage = bank?.qr.indexOf("https://");
    const endImage = bank?.qr.indexOf("?");
    if (startImage !== -1 && endImage !== -1) {
      const imageUrl = bank?.qr.slice(startImage, endImage);
      setImageUrl(imageUrl);
    }
  }, [bank]);
  useEffect(() => {
    setData(receipt);
    setFilterData(receipt);
  }, [receipt]);

  useEffect(() => {
    setSelectItem(users?.length > 0 ? users[0].id : 0);
    setDefaultValue(users?.length > 0 ? users[0] : null);
  }, [users]);

  useEffect(() => {
    dispatch(userList(user.id));
  }, [dispatch]);

  useEffect(() => {
    setSumReceipt(amount_total);
  }, [amount_total]);

  const hanldeModal = () => {
    setIsModal(!isModal);
  };

  const setValue = (value) => {
    var newArray = radioButtonsData.filter((item) => item.id == value); //get the items that are selected
    setRadioButtons(newArray[0].label); //set the selected value in this Hook
    setSelectedId(newArray[0].id);
    if (value == 1) {
      setData(filterData);
    } else if (value == 2) {
      var newDataFilter = filterData.filter((item) => item.amount < 0);
      setData(newDataFilter);
    } else {
      var newDataFilter = filterData.filter((item) => item.amount > 0);
      setData(newDataFilter);
    }
  };

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

      <ScrollView
        ref={listViewRef}
        style={styles.container}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDireaction.current =
            offsetY - lastOffsetY.current > 0 ? "down" : "up";
          lastOffsetY.current = offsetY;
          if (scrollDireaction.current == "down" && offsetY >= 200) {
            Animated.timing(showArrowUp, {
              toValue: 1,
              duration: 40,
              useNativeDriver: false,
            }).start();
          }
          if (scrollDireaction.current == "up" && offsetY < 200) {
            Animated.timing(showArrowUp, {
              toValue: 0,
              duration: 40,
              useNativeDriver: false,
            }).start();
          }
        }}
      >
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
        <View>
          <LinearGradient
            style={styles.containerSum}
            colors={["rgba(116, 208, 104, 1)", "rgba(8, 225, 174, 0.5)"]}
            start={{ x: 0.35, y: 0.2 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sumTop}>
              <View style={styles.sumTopLeft}>
                <Text style={styles.textSum}>Số tiền cần đóng</Text>
                <Text
                  style={[styles.textSum, { fontSize: 24, fontWeight: 500 }]}
                >
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
            <Text style={[styles.textSum, { fontSize: 10}]}>
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
        </View>

        {/* Thông tin chuyển khoản  */}
        <View style={styles.containerInfo}>
          <Text style={styles.title}>Thông tin chuyển khoản</Text>
          <View style={styles.viewComponent}>
            <View style={styles.viewInfoLeft}>
              <View
                style={{
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 4,
                  width: "30%",
                }}
              >
                <Text style={styles.textInfoLeft}>Ngân hàng</Text>
                <Text style={styles.textInfoLeft}>Số tài khoản</Text>
                <Text style={styles.textInfoLeft}>Chủ tài khoản</Text>
                <Text style={styles.textInfoLeft}>Nội dung</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 4,
                  width: "70%",
                }}
              >
                <Text style={styles.textInfoRight}>{bank?.code}</Text>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(`${bank?.number}`),
                      this.toast.show("Copy thành công", 1500);
                  }}
                  on
                >
                  <Text style={styles.textInfoRight}>
                    {bank?.number}{" "}
                    <Feather name="copy" size={12} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.textInfoRight}>{bank?.owner}</Text>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(`${bank?.content}`),
                      this.toast.show("Copy thành công", 1500);
                  }}
                  on
                >
                  <Text style={styles.textInfoRight}>
                    {bank?.content}{" "}
                    <Feather name="copy" size={12} color="black" />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    width: 70,
                    height: 70,
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      position: "absolute",
                      right: 0,
                    }}
                    source={imageUrl ? { uri: imageUrl } : null}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Bảng thống kê chi tiết  */}
        <View style={[styles.containerInfo, { flex: 1 }]}>
          <Text style={styles.title}>Bảng thống kê chi tiết</Text>

          <View style={styles.viewComponentStatistical}>
            <FlatList
              data={data}
              renderItem={({ item }) => <VerticalStatistical item={item} />}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => {
                return (
                  <>
                    <View style={styles.option}>
                      <Text style={{ fontWeight: 500, fontSize: 16 }}>
                        {radioButtons}
                      </Text>
                      <TouchableOpacity
                        onPress={hanldeModal}
                        style={{ position: "relative" }}
                      >
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
            {isModal && (
              <Animated.View style={styles.modal}>
                <TouchableOpacity onPress={hanldeModal}>
                  <Ionicons
                    name="close-sharp"
                    size={20}
                    color="black"
                    style={{
                      textAlign: "right",
                      paddingTop: 6,
                      paddingRight: 10,
                    }}
                  />
                </TouchableOpacity>
                <RadioGroup
                  selectedId={`${selectedId}`}
                  radioButtons={radioButtonsData} //pass in our array
                  onPress={(value) => setValue(value)}
                  containerStyle={{
                    alignItems: "flex-start",
                    paddingHorizontal: 8,
                  }}
                />
              </Animated.View>
            )}
          </View>
        </View>
        
      </ScrollView>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={{
          backgroundColor: "red",
          height: SIZES.height,
          width: SIZES.width,
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ width: 240, alignItems: "flex-end" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image
              style={{
                width: 240,
                height: 280,
              }}
              source={imageUrl ? { uri: imageUrl } : null}
            />
          </View>
        </View>
      </Modal>

      <Animated.View style={[styles.upButtonStyle, { opacity: showArrowUp }]}>
        <TouchableOpacity onPress={upButtonHandler}>
          <Entypo
            name="chevron-up"
            size={45}
            color={COLORS.green}
            style={styles.upButtonImageStyle}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default HomeTuition;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: SIZES.padding,
    flex: 1,
    // flexDirection: "column",/
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
    paddingHorizontal: 8,
  },
  textInfoLeft: {
    color: COLORS.gray,
  },

  modal: {
    backgroundColor: "white",
    height: 140,
    width: 180,
    position: "absolute",
    right: 50,
    top: 20,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: SIZES.radius,
    flexDirection: "column",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  upButtonStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 10,
    zIndex: 100,
  },
  upButtonImageStyle: {
    width: 50,
    height: 50,
  },
});
