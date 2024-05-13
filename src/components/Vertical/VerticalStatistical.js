import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from '../../utils/theme';

const VerticalStatistical = ({item, index, countLength}) => {
    const navigation = useNavigation();
    const config = {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 9,
      };
      const formated = new Intl.NumberFormat("vi-VN", config).format(item.amount);
      return (
        <View
          style={[
            { borderBottomWidth: 1, borderBottomColor: "#EDEFF1", width: "100%"},
            index === countLength - 1 ? { borderBottomWidth: 0 } : null,
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Chi tiết học phí", {
                item: item,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SIZES.padding,
              }}
            >
              <View style={{ width: "65%" }}>
                <Text numberOfLines={2} ellipsizeMode="tail">
                  {item.student_name} - {item.content}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.gray, paddingTop: 2 }}>
                  {item.time}
                </Text>
              </View>
              <View>
                <Text
                  style={
                    item.amount > 0 ? { color: "#005AA9" } : { color: "red" }
                  }
                >
                  {formated}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
}

export default VerticalStatistical