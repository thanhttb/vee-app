/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../utils/theme";

export default function ButtonSurvey({ label, onPress, color, background, loading }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: background,
        borderWidth: 1,
        borderColor: color,
        borderRadius: SIZES.radius,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {loading == true && <ActivityIndicator size="small" color={color} style={{paddingRight: 1}}/>}

      <Text
        style={{
          color: color,
          textAlign: "center",
          fontWeight: 600,
          fontSize:11,
          padding: 10
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
