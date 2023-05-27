import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";

const HomeDetailSituation = ({ route, navigation }) => {
  const {item } = route.params;
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  const formated = new Intl.NumberFormat("vi-VN", config).format(item.amount);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chi tiết giao dịch</Text>
        <View style={styles.viewComponent}>
          
          {/* Ngày thực hiện  */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#EDEFF1",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SIZES.padding,
              }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ color: COLORS.gray, fontSize:12 }}>Ngày thực hiện</Text>
              </View>
              <View>
                <Text style={{fontSize: 12}}>{item.time}</Text>
              </View>
            </View>
          </View>

          {/* Nội dung  */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#EDEFF1",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SIZES.padding,
              }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ color: COLORS.gray, fontSize:12 }}>Nội dung</Text>
              </View>
              <View style={{ width: "55%" }}>
                <Text numberOfLines={2} style={{ textAlign: "right", fontSize: 12 }}>
                 {item.content}
                </Text>
              </View>
            </View>
          </View>

          {item.amount >= 0 ? (
            <>
              {/* Đơn giá  */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#EDEFF1",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: SIZES.padding,
                  }}
                >
                  <View style={{ width: "45%" }}>
                    <Text style={{ color: COLORS.gray, fontSize:12 }}>
                      Đơn giá (theo ca học)
                    </Text>
                  </View>
                   <View>
                    <Text style={{fontSize: 12}}>{item.detail_amount} đ</Text>
                  </View>
                </View>
              </View>
              {/* Số ca học  */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#EDEFF1",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: SIZES.padding,
                  }}
                >
                  <View style={{ width: "45%" }}>
                    <Text style={{ color: COLORS.gray, fontSize:12 }}>Số ca học</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12}}>{item.detail_count}</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Phiếu thu  */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#EDEFF1",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: SIZES.padding,
                  }}
                >
                  <View style={{ width: "45%" }}>
                    <Text style={{ color: COLORS.gray, fontSize:12 }}>Phiếu thu</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12}}>{item.receipt_number}</Text>
                  </View>
                </View>
              </View>

              {/* Phương thức thanh toán  */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#EDEFF1",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: SIZES.padding,
                  }}
                >
                  <View style={{ width: "45%" }}>
                    <Text style={{ color: COLORS.gray, fontSize:12 }}>
                      Phương thức thanh toán
                    </Text>
                  </View>
                   <View>
                    <Text style={{fontSize: 12}}>Chuyển khoản</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {/* Học sinh  */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#EDEFF1",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SIZES.padding,
              }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ color: COLORS.gray, fontSize:12 }}>Học sinh</Text>
              </View>
              <View>
                <Text style={{fontSize: 12}}>{item.student_name}</Text>
              </View>
            </View>
          </View>

          {/* Tổng  */}
          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SIZES.padding,
              }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ color: COLORS.gray, fontSize:12 }}>Tổng</Text>
              </View>
              <View>
                <Text style={{fontSize: 12}}>{formated}</Text>
              </View>
            </View>
          </View>


        </View>
      </View>
    </View>
  );
};

export default HomeDetailSituation;

const styles = StyleSheet.create({
  container: {
    margin: SIZES.padding,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  viewComponent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
