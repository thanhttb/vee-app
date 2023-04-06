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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//utils
import { COLORS, SIZES } from "../utils/theme";
//components
import Calendar from '../components/Calendar';


const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.header}>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={onPress} style={styles.iconHeader}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity> */}
          <View>
            <Text style={styles.textHeader}>Lịch học</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={{ height: SIZES.header - SIZES.base }}></View>
      <View
        style={{
          backgroundColor: COLORS.green,
          height: 60,
          position: "relative",
          top: -50,
          marginBottom: -50,
        }}
      >
      <View style={{
        backgroundColor: 'red', 
        height: 150,
        position: 'absolute',
        marginHorizontal: 20,
        borderRadius: 16,
        marginTop: -20                                                         
      }}>
      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      </View>
      </View>

      {/* <View style={{ backgroundColor: "gray", height: "100%" }}></View> */}
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: SIZES.header * 2.5,
    backgroundColor: COLORS.green,
  },
  iconHeader: {
    position: "absolute",
    marginTop: SIZES.headerIcon,
    marginLeft: SIZES.spacing,
    width: 40,
  },
  textHeader: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    color: COLORS.white,
    paddingTop: SIZES.padding,
  },
});
