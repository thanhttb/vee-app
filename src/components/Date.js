import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import { COLORS, SIZES } from "../utils/theme";
import { useEffect, useState } from "react";

const Date = ({ date, onSelectDate, selected, activeTime }) => {
  const [active, setActive] = useState(false);
  const selectedDate = ["2023-05-11", "2023-05-12"];
  const da = moment(date).format("YYYY-MM-DD");

  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  useEffect(() => {
    setActive(selectedDate.includes(da));
  }, []);
  const day =
    moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? "Today"
      : moment(date).format("ddd");
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("YYYY-MM-DD");

  return (
    <>
      {
        <TouchableOpacity
          onPress={() => onSelectDate(fullDate)}
          style={[styles.card, selected === fullDate && styles.cardAc]}
        >
          <Text style={[styles.big, selected === fullDate && styles.cardAc]}>
            {day}
          </Text>
          <View style={{ height: 4 }} />
          <View
            style={[
              styles.dateN,
              selected === fullDate && selected === fullDate && styles.dateAc,
              active == true && selected !== fullDate && styles.activeAc,
              // dateNow == true && styles.dateAc
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
});
