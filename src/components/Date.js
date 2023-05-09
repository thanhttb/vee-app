import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import { COLORS, SIZES } from "../utils/theme";
import { useEffect, useState } from "react";

const Date = ({ date, selectSessionDate, selected, dateWeek }) => {
  const [active, setActive] = useState(false);
  const da = moment(date).format("DD/MM");

  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  useEffect(() => {
    setActive(dateWeek.includes(da));
  }, [dateWeek]);
  const day =
    moment(date).format("DD/MM") === moment().format("DD/MM")
      ? "Hôm nay"
      : moment(date).format("ddd");
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("DD/MM");

  return (
    <>
      {
        <TouchableOpacity
          onPress={() => selectSessionDate(fullDate)}
          style={[styles.card, selected === fullDate && styles.cardAc]}
        >
          <Text style={[styles.big, selected === fullDate && styles.cardAc]}>
            {day}
          </Text>
          <View style={{ height: 4 }} />
          <View
            style={[
              styles.dateN,
              selected === fullDate && styles.dateAc,
              active == true && styles.activeAc,
            ]}
          >
            <Text
              style={[
                styles.medium,
                selected === fullDate && { color: COLORS.green },
              ]}
            >
              {dayNumber}
            </Text>

            <View style={[selected === fullDate && styles.dot]}></View>
          </View>
        </TouchableOpacity>
      }
    </>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    padding: SIZES.base,
    alignItems: "center",
  },
  cardAc: {
    borderRadius: SIZES.base,
  },
  big: {
    color: COLORS.gray,
    fontSize: SIZES.h3,
  },
  medium: {
    // fontSize: SIZES.h14,
  },
  dateN: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  activeAc: {
    backgroundColor: "rgba(0, 171, 85, 0.1)",
  },
  dateAc: {
    backgroundColor: COLORS.lesson,
  },
  dot: { height: 4, width: 4, backgroundColor: COLORS.green, borderRadius: 50 },
});
