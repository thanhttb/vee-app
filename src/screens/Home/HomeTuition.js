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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//utils
import { COLORS, SIZES } from "../../utils/theme";

const HomeTuition = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        {/* <Text style={styles.textHeader}>Học phí</Text> */}
      </View>

      <View style={styles.container}>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View style={styles.containerMonth}>
            <View style={styles.headerMonth}>
              <Text style={[styles.headerText, { width: "30%" }]}>Tháng 3</Text>
              <Text style={styles.headerText}>Nội dung</Text>
            </View>
            <View style={styles.contentMonth}>
              <Text style={styles.contentDate}>26/3/2023</Text>
              <View style={styles.contentDetail}>
                <Text>Tổng số tiền học phí tháng 04-2023: 480.000đ</Text>
                <View style={styles.contentDetailText}>
                  <Text style={styles.contentText}>
                    <View
                      style={styles.dotText}
                    ></View>
                    <View
                      style={{
                        width: 4,
                        height: 4,
                      }}
                    ></View>
                    Học phí lớp TC5.5 tháng 04-2023: 120.000đ
                  </Text>
                  <Text style={styles.contentText}>
                  <View
                      style={styles.dotText}
                    ></View>
                    <View
                      style={{
                        width: 4,
                        height: 4,
                      }}
                    ></View>
                    Học phí lớp TC6.5 tháng 04-2023: 320.000đ
                  </Text>
                </View>
                <Text style={styles.status}>Tình trạng: Đã đóng học phí</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerMonth}>
            <View style={styles.headerMonth}>
              <Text style={[styles.headerText, { width: "30%" }]}>Tháng 3</Text>
              <Text style={styles.headerText}>Nội dung</Text>
            </View>
            <View style={styles.contentMonth}>
              <Text style={styles.contentDate}>26/3/2023</Text>
              <View style={styles.contentDetail}>
                <Text>Tổng số tiền học phí tháng 04-2023: 480.000đ</Text>
                <View style={styles.contentDetailText}>
                  <Text style={styles.contentText}>
                    <View
                      style={styles.dotText}
                    ></View>
                    <View
                      style={{
                        width: 4,
                        height: 4,
                      }}
                    ></View>
                    Học phí lớp TC5.5 tháng 04-2023: 120.000đ
                  </Text>
                  <Text style={styles.contentText}>
                  <View
                      style={styles.dotText}
                    ></View>
                    <View
                      style={{
                        width: 4,
                        height: 4,
                      }}
                    ></View>
                    Học phí lớp TC6.5 tháng 04-2023: 320.000đ
                  </Text>
                </View>
                <Text style={styles.status}>Tình trạng: Đã đóng học phí</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeTuition;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    // height: SIZES.header * 1.2,
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
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: SIZES.padding,
    height: SIZES.height - SIZES.header * 4.8,
  },
  containerMonth: {
    marginTop: SIZES.padding,
  },
  headerMonth: {
    backgroundColor: "rgba(145, 158, 171, 0.16)",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  headerText: {
    color: "#212B36",
    fontSize: SIZES.h14,
    fontWeight: 600,
    paddingLeft: SIZES.spacing,
  },
  contentMonth: {
    padding: SIZES.spacing,
    flexDirection: "row",
  },
  contentDate: {
    color: COLORS.gray,
    fontSize: SIZES.h14,
    width: "30%",
  },
  contentDetail: {
    width: "70%",
  },
  contentDetailText: {
    paddingLeft: 12,
    paddingVertical: 8,
  },
  dotText: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "#00AB55",
  },
  contentText: {
    paddingBottom: 4
  },
  status: {
    color: COLORS.green,
  },
});
