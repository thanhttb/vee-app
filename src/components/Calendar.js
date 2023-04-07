import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";
import Date from "./Date";
import { SIZES } from "../utils/theme";
const selectedDate = [ "2023-04-7", "2023-04-8"];

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 14; i++) {
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
      .add(scrollPosition / 60, "days")
      .format("MMMM");
    setCurrentMonth(month);
  };

  useEffect(() => {
    getCurrentMonth();
  }, [scrollPosition]);
  // console.log('selectedDate',selectedDate)
  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>Tháng: {currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll is a native event that returns the number of pixels the user has scrolled
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
            scrollEventThrottle={16}
          >
            {dates.map((date, index) => {
              return (
                <Date
                  key={index}
                  date={date}
                  onSelectDate={onSelectDate}
                  selected={selected}
                  // active={selectedDate.includes(
                  //   moment(date).format("YYYY-MM-DD")
                  // )}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: SIZES.spacing,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: "bold",
    paddingTop: SIZES.base,
  },
  dateSection: {
    width: "100%",
    paddingHorizontal: SIZES.base,
  },
  scroll: {
    // height: 90,
  },
});
