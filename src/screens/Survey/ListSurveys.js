import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Text, View, FlatList, StyleSheet } from "react-native";
import VertiacalSurvey from "../../components/Vertical/VertiacalSurvey";
import { SIZES } from "../../utils/theme";

const data = [
  {
    id: 1,
    student: "Phajm quynh chi 1",
    target: "",
    exam: "Toán điều kiện",
    time: "16:00-18:00, 07/01/2023",
    location: "Số 17,ngõ 26 phó Đỗ Quang, Trung Hòa, Cầu Giấy",
    sbd: "30285",
    room: "30285",
  },
  {
    id: 2,
    student: "Phajm quynh chi 2",
    target: "",
    exam: "Toán điều kiện",
    time: "16:00-18:00, 07/01/2023",
    location: "Số 17,ngõ 26 phó Đỗ Quang, Trung Hòa, Cầu Giấy",
    sbd: "30285",
    room: "30285",
  },
  {
    id: 3,
    student: "Phajm quynh chi 3",
    target: "",
    exam: "Toán điều kiện",
    time: "16:00-18:00, 07/01/2023",
    location: "Số 17,ngõ 26 phó Đỗ Quang, Trung Hòa, Cầu Giấy",
    sbd: "30285",
    room: "30285",
  },
];
const ListSurveys = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1}}>
      {isLoading == true ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {data?.length > 0 ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={data}
                stickySectionHeadersEnabled={false}
                style={{ flex: 1, paddingBottom: 20 }}
                keyExtractor={(item, index) => index.toString()}
                // scrollEnabled={false}
                renderItem={({ item }) => <VertiacalSurvey item={item} />}
              />
            </View>
          ) : (
            <View style={styles.loading}>
              <Text>Chưa có bài khảo sát nào</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ListSurveys;

const styles = StyleSheet.create({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
