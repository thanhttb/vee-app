import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";

const VertiacalSurvey = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ padding: 8 }}>
        <Image
          source={require('../../../assets/bg-mon.jpg')}
          
          style={{ width: "100%", height: 150, borderRadius: SIZES.radius, resizeMode:'center' }}
        />
        <View style={styles.content}>
          <Text style={styles.name}>Học sinh: {item?.student_name}</Text>
          <Text style={styles.text}>
            <Text style={styles.note}>Mục tiêu: </Text>
            {item?.event_name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.note}>Môn khảo sát: </Text>
            {item?.ss_name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.note}>Thời gian: </Text>
            {item?.due_date}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.note}>Cơ sở thi: </Text>
            {item?.location}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.note}>SBD: </Text>
            {item?.sbd}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Kết quả khảo sát", {
                  result_id: item.ss_id,
              })
            }
          >
            <View style={styles.button}>
              <Text style={styles.textButton}>Xem kết quả</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VertiacalSurvey;

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
  name: {
    fontSize: SIZES.h2,
    fontWeight: 600,
    paddingVertical: 4,
  },
  note: {
    color: "black",
  },
  text: {
    fontWeight: 500,
    color: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.green,
    borderRadius: 8,
    borderColor: COLORS.green,
    width: "100%",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  textButton: {
    color: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: SIZES.h2,
    fontWeight: 600,
    textAlign: "center",
  },
});
