import { ActivityIndicator, SafeAreaView } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../config";
import { SIZES } from "../../utils/theme";
import VertiacalSurvey from "../../components/Vertical/VertiacalSurvey";
import axios from "axios";

const ListSurveys = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      let token = await AsyncStorage.getItem("tokenUser");
      axios
        .get(BASE_URL+"event/get", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {setData(res.data); setIsLoading(false)})
        .catch((err) => {console.log(err); setIsLoading(false)});
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
 loading: {
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
 }
});
