import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../utils/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileHome = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: COLORS.green }}></SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/avatar_default.jpg")}
          />
          <Text style={styles.name}>Minh Bui</Text>
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.content}>
          <TouchableOpacity onPress={()=> navigation.navigate("Thông tin phụ huynh")}>
          <View style={styles.actionPush}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.textAction}>Thông tin phụ huynh</Text>
            <MaterialIcons style={{position: "absolute", right: 0}} name="navigate-next" size={24} color="black" />
          </View>
          </TouchableOpacity>

          <View style={styles.actionPush}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.textAction}>Thông tin học sinh</Text>
            <MaterialIcons style={{position: "absolute", right: 0}} name="navigate-next" size={24} color="black" />
          </View>

          <View style={styles.actionPush}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.textAction}>Đổi mật khẩu</Text>
            <MaterialIcons style={{position: "absolute", right: 0}} name="navigate-next" size={24} color="black" />
          </View>

          <View style={styles.actionPush}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.textAction}>Đăng xuất</Text>
            <MaterialIcons style={{position: "absolute", right: 0}} name="navigate-next" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHome;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.green,
    height: SIZES.header * 4,
  },
  headerContent: {
    alignItems: "center",
    marginTop: SIZES.header,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 50,
  },
  name: {
    fontSize: SIZES.h1,
    color: COLORS.white,
    fontWeight: "bold",
    paddingTop: SIZES.spacing,
  },
  action: {
    flex: 1,
  },
  content: {
    padding: SIZES.padding,
  },
  actionPush: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.spacing
  },
  textAction: {
    fontWeight: 600,
    fontSize:SIZES.h14,
    paddingLeft: SIZES.spacing
  }
});