import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-gifted-charts";
import Button from "../../components/Button/ButtonSurvey";
import Spacer from "../../components/Spacer";
import axios from "axios";
import { useEffect } from "react";

import { BASE_URL } from "../../../config";

const SurveyResult = ({ route, navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSurvey, setDataSurvey] = useState([]);
  const [data, setData] = useState([]);

  const { result_id, ss_name, grade } = route.params;

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      let token = await AsyncStorage.getItem("tokenUser");
      axios
        .get(BASE_URL + `portal/event/result?ss_id=${result_id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("ERROR", err);
          setIsLoading(false);
        });
    }
    fetchData();
  }, [result_id]);

  useEffect(() => {
    const newData = Array(
      data?.chart && data.chart.length === 3
        ? 30
        : data?.chart && data.chart.length === 2
        ? 20
        : 10
    ).fill(0);
    if (data !== undefined) {
      for (let i = 0; i < data?.chart?.length; i++) {
        const dataNew = data?.chart[i].data;
        for (let j = 0; j < dataNew?.length; j++) {
          newData[j * data.chart?.length + i] = dataNew[j];
        }
      }

      if (data?.chart?.length == 3) {
        const result = newData.map((value, index) => {
          if (index % 3 === 1) {
            return {
              value: value === 0 ? 1 : value,
              spacing: 2,
              labelWidth: 30,
              labelTextStyle: { color: "red" },
              frontColor: COLORS.yellow,
            };
          } else if ((index - 2) % 3 !== 0) {
            return {
              value: value === 0 ? 1 : value,
              label: `${index / 3}-${(index + 3) / 3}`,
              spacing: 2,
              labelWidth: 30,
              labelTextStyle: { color: "gray" },
              frontColor: COLORS.green,
            };
          } else {
            return {
              value: value === 0 ? 1 : value,
              frontColor: COLORS.blue,
            };
          }
        });
      } else {
        const result = newData?.map((value, index) => {
          return {
            value: value === 0 ? 1 : value,
            spacing: 10,
            label: `${index + 1}`,
            labelWidth: 10,
            labelTextStyle: COLORS.green,
            frontColor: COLORS.green,
          };
        });
      }
    } else {
      console.log("no data");
    }

    console.log("newData", newData);
  }, [data]);

  const showReview = (data) => {
    setIsActive(!isActive);
    setDataSurvey(data);
  };

  const renderTitle = () => {
    return (
      <View>
        <Text style={styles.title}>Thống kê kết quả</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 12,
          }}
        >
          {grade === 5 && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: COLORS.green,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    width: 70,
                    height: 16,
                    color: "lightgray",
                  }}
                >
                  Toán
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: COLORS.yellow,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    width: 70,
                    height: 16,
                    color: "lightgray",
                  }}
                >
                  Tiếng việt
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: COLORS.blue,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    width: 70,
                    height: 16,
                    color: "lightgray",
                  }}
                >
                  Tiếng anh
                </Text>
              </View>
            </>
          )}

          {grade === 9 && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: COLORS.green,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    width: 120,
                    height: 16,
                    color: "lightgray",
                  }}
                >
                  {ss_name}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };
  const examLength = data?.__danhgia?.length;
  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={[styles.overlay, isActive == false && { opacity: 1 }]}
    >
      {isLoading == true ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ActivityIndicator
            size="small"
            color={COLORS.green}
            style={{ paddingRight: 2 }}
          />
          <Text style={styles.titleNote}>Loading</Text>
        </View>
      ) : (
        <>
          {data?.status == 0 ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titleNote}>
                  Môn thi của bạn chưa có điểm, vui lòng đợi !!!
                </Text>
              </View>
            </>
          ) : (
            <>
              <ScrollView>
                <View style={styles.container}>
                  <View style={styles.card}>
                    <Text style={styles.title}>Kết quả thi</Text>
                    <View style={styles.content}>
                      <Text style={styles.text}>
                        <Text style={styles.note}>Môn thi: </Text>
                        {data?.session_name}
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.note}>Tổng điểm thi: </Text>
                        {data?.total_score}
                        {examLength == 3 ? `/30` : `/10`}
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.note}>Mục tiêu: </Text>
                        {data?.objective}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <View style={styles.container}>
                  <View style={styles.card}>
                    {data && !data.chart && isLoadingBarChart === true ? (
                      <ActivityIndicator />
                    ) : (
                      <>
                        <View style={styles.content}>
                          {renderTitle()}
                          <BarChart
                            initialSpacing={0}
                            isAnimated
                            thickness={3}
                            color="#07BAD1"
                            pressEnabled={true}
                            data={dataChart}
                            showDataPointOnPress={true}
                            stepValue
                            animateOnDataChange
                            animationDuration={1000}
                            onDataChangeAnimationDuration={300}
                            barWidth={8}
                            spacing={20}
                            startOpacity={0.4}
                            endOpacity={0.1}
                            roundedTop
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisTextStyle={{ color: "gray" }}
                            noOfSections={6}

                            // maxValue={30}
                          />
                        </View>
                      </>
                    )}
                  </View>
                </View> */}

                {data?.__danhgia?.map((danhgia, index) => {
                  const isCheck = danhgia?.diem.includes("/10");
                  return (
                    <View style={styles.container} key={index}>
                      <View style={styles.card}>
                        <Text style={[styles.title]}>
                          Đánh giá chi tiết môn thi: {danhgia.subject}
                        </Text>
                        <View style={styles.content}>
                          <Text style={styles.text}>
                            <Text style={styles.note}>Điểm: </Text>
                            {isCheck ? danhgia?.diem : `${danhgia.diem}10`}
                          </Text>

                          <View style={styles.row}>
                            {danhgia.danh_gia.map((dg, index) => {
                              return (
                                <Button
                                  key={index}
                                  onPress={() => showReview(dg)}
                                  label={dg.title}
                                  color={"black"}
                                  background={COLORS.white}
                                />
                              );
                            })}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )}
        </>
      )}

      {isActive == true && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isActive}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          style={{
            height: SIZES.height,
            width: SIZES.width,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setIsActive(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.title, { paddingBottom: 10 }]}>
                  Tiêu chí: {dataSurvey?.title}
                </Text>
                <Text
                  style={[styles.title, { textAlign: "left", fontWeight: 700 }]}
                >
                  Những điều con đã thể hiện tốt:
                </Text>
                <Text>{dataSurvey?.content_1}</Text>
                <Text
                  style={[styles.title, { textAlign: "left", fontWeight: 700 }]}
                >
                  Những điều con có thể rút kinh nghiệm:
                </Text>
                <Text>{dataSurvey?.content_2}</Text>
                <Spacer height={10} />
                <Button
                  onPress={() => setIsActive(false)}
                  label={"Đóng"}
                  color={COLORS.red}
                  background={COLORS.white}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default SurveyResult;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.spacing,
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
  },
  content: { paddingHorizontal: 4 },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: SIZES.spacing,
  },
  card: {
    padding: 4,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 4,
  },
  note: {
    color: "black",
    textAlign: "center",
  },
  text: {
    fontWeight: 500,
    color: COLORS.gray,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  titleNote: {
    fontWeight: 500,
    color: COLORS.green,
  },
});
