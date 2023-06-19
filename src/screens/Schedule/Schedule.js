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
import { session_week } from "../../redux/actions/sessionActions";
//utils
import { COLORS, SIZES } from "../../utils/theme";
//components
import Calendar from "../../components/Date/Calendar";
import LessonCalendar from "../../components/Date/LessonCalendar";
import Spacer from "../../components/Spacer";

const Schedule = () => {
  const date = new Date();
  const { user, authToken } = useSelector((state) => state.authReducer);
  const [sessionWeek, setSessionWeek] = useState([]);
  const [sessionWeekFilter, setSessionWeekFilter] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedLesson, setSelectedLesson] = useState(false);
  const [dateWeek, setDateWeek] = useState([]);
  const [selectedSession, setSelectedSession] = useState();

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
    setSelectedSession(data);
    setSelectedLesson(!selectedLesson);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white"}}>
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
          <>
            <ScrollView style={{ paddingBottom: SIZES.spacing,}}>
              {sessionWeekFilter.map((item, i) => {
                return (
                  <LessonCalendar
                    key={i}
                    showDetailLesson={showDetailLesson}
                    item={item}
                    index={i}
                  />
                );
              })}
            </ScrollView>
          </>
        ) : (
          <View>
            <Spacer />
            <Text style={{textAlign: 'center'}}>Không có lịch học ngày {selectedDate}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Schedule;

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
    flex: 1,
    height: "100%",
  },
});
