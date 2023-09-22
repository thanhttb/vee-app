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
      </View>
    </View>
  );
};
const SurveyResult = () => {
  const [dataChart, setDataChart] = useState([]);
  const newData = Array(30).fill(0);
  useEffect(() => {
    for (let i = 0; i < data.chart.length; i++) {
      const dataNew = data.chart[i].data;
      for (let j = 0; j < dataNew.length; j++) {
        newData[j * data.chart.length + i] = dataNew[j];
      }
    }

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
    setDataChart(result);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Kết quả thi</Text>
            <View style={styles.content}>
              <Text style={styles.text}>
                <Text style={styles.note}>Môn thi: </Text>
                {data?.event_name}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.note}>Tổng điểm thi: </Text>
                {data?.total_score}/{data?.max_score}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.note}>Mục tiêu: </Text>
                {data?.objective}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.content}>
              {renderTitle()}
              <BarChart
                data={dataChart}
                barWidth={8}
                spacing={24}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray" }}
                noOfSections={3}
                maxValue={30}
              />
            </View>
          </View>
        </View>
        <Spacer />
        {data?.__danhgia.map((danhgia, index) => {
          return (
            <View style={styles.container} key={index}>
              <View style={styles.card}>
                <Text style={styles.title}>
                  Đánh giá chi tiết môn thi: {danhgia.subject}
                </Text>
                <View style={styles.content}>
                  <Text style={styles.text}>
                    <Text style={styles.note}>Điểm: </Text>
                    {danhgia?.diem}
                  </Text>

                  {/* {
                    danhgia.danh_gia.map((dg, index) => {
                      return (
                        <>
                          
                        </>
                      )
                    })
                  } */}
                </View>
              </View>
            </View>
          );
        })}
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
  content: { paddingHorizontal: 4 },
  card: {
    padding: 4,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  note: {
    color: "black",
  },
  text: {
    fontWeight: 500,
    color: COLORS.gray,
  },
});
