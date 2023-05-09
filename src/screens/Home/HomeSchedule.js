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

//redux
import { session_week } from "../../redux/actions/sessionActions";

const HomeSchedule = () => {
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [sessionWeek, setSessionWeek] = useState([]);
  const [sessionWeekFilter, setSessionWeekFilter] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedLesson, setSelectedLesson] = useState(false);
  const [dateWeek, setDateWeek] = useState([]);
  const [selectedSession, setSelectedSession] = useState()

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.sessionReducer);

  useEffect(() => {
    dispatch(session_week(user?.id));
  }, [dispatch]);

  useEffect(() => {
    const dates = data.map((item) => item.date);
    setDateWeek(dates);
  }, [data]);

  useEffect(() => {
    setSessionWeek(data);
    setSessionWeekFilter(data);
  }, [data]);

  const selectSessionDate = (date) => {
    setSelectedDate(date);
    const data = sessionWeek.filter((item) => item.date == date);
    setSessionWeekFilter(data);
  };
  const showDetailLesson = (data) => {
    setSelectedSession(data)
    setSelectedLesson(!selectedLesson);

  };

  // console.log('selectedDate', selectedDate)

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}></View>
      <View style={{ height: SIZES.header - SIZES.base }}></View>
      <View style={styles.headerBottom}>
        <View style={styles.calendar}>
          <Calendar
            selectSessionDate={selectSessionDate}
            selected={selectedDate}
            dateWeek={dateWeek}
          />
        </View>
      </View>

      <View style={styles.container}>
        {sessionWeekFilter.length > 0 ? (
          sessionWeekFilter.map((item, i) => {
            return (
              <LessonCalendar
                showDetailLesson={showDetailLesson}
                item={item}
                index={i}
              />
            );
          })
        ) : (
          <View>
            <Spacer />
            <Text>Không có lịch học ngày {selectedDate}</Text>
          </View>
        )}

        {/* <DetailCalendar/> */}
        {selectedLesson && (
          <SimpleModal
            showDetailLesson={showDetailLesson}
            selectedLesson={selectedLesson}
            selectedSession={selectedSession}
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
