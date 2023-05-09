import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";
import Date from "./Date";
import { COLORS, SIZES } from "../utils/theme";

const Calendar = ({ selectSessionDate, selected, dateWeek }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const scrollViewRef = useRef(null);
  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = -4; i < 11; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  const getCurrentMonth = () => {
    const month = moment(dates[0])
      .add(scrollPosition.x / 60, "days")
      .format("MMMM");
    setCurrentMonth(month);
  };

  useEffect(() => {
    getCurrentMonth();
  }, [scrollPosition]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 180, y: 0, animated: false });
    }
  }, []);


  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>{currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
            scrollEventThrottle={16}
            contentOffset={{x: 180, y: 0}}
          >
            {dates.map((date, index) => {
              return (
                <Date
                  key={index}
                  date={date}
                  selectSessionDate={selectSessionDate}
                  selected={selected}
                  dateWeek={dateWeek}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    paddingLeft: SIZES.spacing,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 600,
    color: "#212B36",
    padding: SIZES.base,
    textTransform: "capitalize",
  },
  dateSection: {
    width: "100%",
    paddingHorizontal: SIZES.base,
  },
  scroll: {
    // height: 90,
  },
});
