/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../utils/theme";

export default function Button({ label, onPress, color, background, loading }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: background,
        borderWidth: 1,
        borderColor: COLORS.green,
        borderRadius: SIZES.base,
        paddingVertical: SIZES.spacing * 1.8,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {loading == true && <ActivityIndicator size="small" color={color}style={{paddingRight: 2}}/>}

      <Text
        style={{
          color: color,
          textAlign: "center",
          fontWeight: 700,
          fontSize: SIZES.h2,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
