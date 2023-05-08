import React, { useEffect, useState } from "react";
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
//redux
import { Provider, useDispatch, useSelector } from "react-redux";
//utils
import { COLORS, SIZES } from "../../utils/theme";
import { BASE_URL } from "../../../config";
//components
import Calendar from "../../components/Calendar";
import LessonCalendar from "../../components/LessonCalendar";
import DetailCalendar from "../../components/DetailCalendar";
import Spacer from "../../components/Spacer";
import SimpleModal from "../../components/SimpleModal";
import axios from "axios";

const HomeSchedule = () => {
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [selectedDate, setSelectedDate] = useState();
  // const [selectedDate, setSelectedDate] = useState("2023-05-11");
  const [selectedLesson, setSelectedLesson] = useState(false);
  const [dataSessionWeek, setDataSessionWeek] = useState([]);
  const [selectedDateWeek, setSelectedDateWeek] = useState([]);

 

  useEffect(() => {
    axios
      .post(
        BASE_URL + "session-week",
        { parent_id: user?.id },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => setDataSessionWeek(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    // const dates = dataSessionWeek.map(item => item.date);
    // setSelectedDateWeek(dates)
    dataSessionWeek.map((item) => {
      setSelectedDateWeek([...selectedDateWeek, item?.date]);
    });
  }, [dataSessionWeek]);
 console.log('setSelectedDateWeek', selectedDateWeek)

  const showDetailLesson = () => {
    setSelectedLesson(!selectedLesson);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}></View>
      <View style={{ height: SIZES.header - SIZES.base }}></View>
      <View style={styles.headerBottom}>
        <View style={styles.calendar}>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </View>
      </View>

      <View style={styles.container}>
        {dataSessionWeek.map((item, i) => {
          return (
            <LessonCalendar
            key={i}
              showDetailLesson={showDetailLesson}
              item={item}
              index={i}
            />
          );
        })}

        {/* <DetailCalendar/> */}
        {selectedLesson && (
          <SimpleModal
            showDetailLesson={showDetailLesson}
            selectedLesson={selectedLesson}
          />
        )}
      </View>
    </View>
  );
};

export default HomeSchedule;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: SIZES.header * 1.2,
    backgroundColor: COLORS.green,
    marginTop: 0,
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
    marginTop: SIZES.spacing * 3,
    marginHorizontal: SIZES.padding,
  },
});
