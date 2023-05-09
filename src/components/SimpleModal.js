import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import DetailCalendar from "./DetailCalendar";
import { COLORS, SIZES } from "../utils/theme";

const SimpleModal = ({ showDetailLesson, selectedLesson, selectedSession }) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={selectedLesson}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={showDetailLesson}
      >
        <View style={styles.modal}>
          <DetailCalendar showDetailLesson={showDetailLesson} selectedSession={selectedSession}/>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default SimpleModal;

const styles = StyleSheet.create({
  modal: {
    height: SIZES.height,
    width: SIZES.width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
 
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});
