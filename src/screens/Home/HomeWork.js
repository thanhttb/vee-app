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
import { COLORS, SIZES } from "../../utils/theme";
//components
import Calendar from "../../components/Calendar";
import LessonCalendar from "../../components/LessonCalendar";
import DetailCalendar from "../../components/DetailCalendar";
import VerticalHomeWork from "../../components/VerticalHomeWork";

const HomeWork = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedLesson, setSelectedLesson] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        {/* <View style={styles.header}>
          <View>
            <Text style={styles.textHeader}>Bài tập về nhà</Text>
          </View>
        </View> */}
      </View>
      <View style={{ height: SIZES.header - SIZES.base }}></View>
      <View style={styles.headerBottom}>
        <View style={styles.calendar}>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </View>
      </View>

      <View style={styles.container}>

        <VerticalHomeWork/>
        <VerticalHomeWork/>
        <VerticalHomeWork/>

        
      </View>
    </View>
  );
};

export default HomeWork;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: SIZES.header * 1.2,
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
  headerBottom: {
    backgroundColor: COLORS.green,
    height: SIZES.spacing * 5,
    position: "relative",
    top: -SIZES.spacing * 5,
    marginBottom: -SIZES.spacing * 5,
  },
  calendar: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: "absolute",
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginTop: -SIZES.spacing * 2,
  },
  container: {
    justifyContent: "center",
    marginTop: SIZES.header,
    marginHorizontal: SIZES.padding,
  },
});
