import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../utils/theme";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import Spacer from "../../components/Spacer";
import { useEffect } from "react";

const data = {
  chart: [
    {
      name: "Toan",
      data: [10, 6, 11, 18, 19, 15, 7, 8, 1, 5],
    },
    {
      name: "Tiếng Việt",
      data: [2, 1, 6, 18, 26, 20, 15, 6, 0, 6],
    },
    { name: "Tiếng Anh", data: [0, 0, 11, 14, 16, 17, 17, 12, 6, 7] },
  ],
  event_name: "Khảo sát 5 lên 6 năm 2023 đợt 1",
  max_score: 0,
  objective: "Marie Curie",
  session_name: "Tổ hợp Toán - Tiếng Việt - Tiếng Anh ngày 1",
  status: 1,
  student_name: "Quang Minh",
  time: "07/01/2023 08:00",
  total_score: 22.5,
  __danhgia: [
    {
      active: true,
      danh_gia: [
        {
          attempt_id: 6286,
          content: "12|123",
          content_1: "12",
          content_2: "123",
          created_at: "2023-01-04T17:10:32.000000Z",
          domain: "Toán",
          id: 2940,
          title: "Trình bày",
          total_score: 0,
          updated_at: "2023-01-05T17:16:42.000000Z",
        },
        {
          attempt_id: 6286,
          content: "12|123",
          content_1: "12",
          content_2: "123",
          created_at: "2023-01-04T17:10:32.000000Z",
          domain: "Toán",
          id: 2948,
          title: "Trình bày",
          total_score: 0,
          updated_at: "2023-01-05T17:16:42.000000Z",
        },
        {
          attempt_id: 6286,
          content: "12|123",
          content_1: "12",
          content_2: "123",
          created_at: "2023-01-04T17:10:32.000000Z",
          domain: "Toán",
          id: 2949,
          title: "Trình bày",
          total_score: 0,
          updated_at: "2023-01-05T17:16:42.000000Z",
        },
      ],
      diem: "9/0",
      diem_10: false,
      question_number: 1,
      subject: "Toan",
    },
    {
      active: false,
      danh_gia: [
        {
          attempt_id: 6286,
          content: "12|123",
          content_1: "12",
          content_2: "123",
          created_at: "2023-01-04T17:10:32.000000Z",
          domain: "Toán",
          id: 2940,
          title: "Trình bày",
          total_score: 0,
          updated_at: "2023-01-05T17:16:42.000000Z",
        },
        {
          attempt_id: 6286,
          content: "12|123",
          content_1: "12",
          content_2: "123",
          created_at: "2023-01-04T17:10:32.000000Z",
          domain: "Toán",
          id: 2948,
          title: "Trình bày",
          total_score: 0,
          updated_at: "2023-01-05T17:16:42.000000Z",
        },
        {
          attempt_id: 6286,
          content: "12|123",
          content_1: "12",
          content_2: "123",
          created_at: "2023-01-04T17:10:32.000000Z",
          domain: "Toán",
          id: 2949,
          title: "Trình bày",
          total_score: 0,
          updated_at: "2023-01-05T17:16:42.000000Z",
        },
      ],
      diem: "9/0",
      diem_10: false,
      question_number: 1,
      subject: "Tieng Viet",
    },
  ],
};
const barData = [
  // 1
  {
    value: 40,
    label: "0-1",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.green,
  },
  {
    value: 1,
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "red" },
    frontColor: COLORS.yellow,
  },
  { value: 20, frontColor: COLORS.blue },
  //2
  {
    value: 60,
    label: "1-2",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.green,
  },
  {
    value: 30,
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "red" },
    frontColor: COLORS.yellow,
  },
  { value: 20, frontColor: COLORS.blue },

];

const renderTitle = () => {
  return(
    <View >
    <Text
      style={{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
      Thống kê kết quả
    </Text>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 12,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            color: 'lightgray',
          }}>
          Toán
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            color: 'lightgray',
          }}>
          Tiếng việt
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            color: 'lightgray',
          }}>
          Tiếng anh
        </Text>
      </View>
    </View>
  </View>
  )
}
const SurveyResult = () => {
  const [dataChart , setDataChart] = useState([]);
  const newData = Array(30).fill(0);
  useEffect(() => {
    for (let i = 0; i < data.chart.length; i++) {
      const dataNew = data.chart[i].data;
      for (let j = 0; j < dataNew.length; j++) {
        newData[j * data.chart.length + i] = dataNew[j];
      }
    }
    setDataChart(newData)
  }, [])
  
  console.log('dataChart',dataChart)
  
  // Interleave the data from the original arrays.
 
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text>Kết quả thi</Text>
            <View style={styles.content}>
              <Text>Môn thi: {data?.event_name}</Text>
              <Text>
                Tổng điểm thi: {data?.total_score}/{data?.max_score}
              </Text>
              <Text>Mục tiêu: {data?.objective}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* <Text>Thong ke ket qua</Text> */}
            <View style={styles.content}>
            {renderTitle()}
              <BarChart
                data={barData}
                barWidth={8}
                spacing={20}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray" }}
                noOfSections={3}
                maxValue={100}
              />
            </View>
          </View>
        </View>
        <Spacer />
        <View style={styles.container}>
          <Text>Danh gia chi tiet mon thi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyResult;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.spacing,
    marginTop: SIZES.spacing,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card: {
    padding: 4,
  },
});
