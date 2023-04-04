/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../utils/theme';

export default function Button({label, onPress,color, background}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: background,
        borderWidth: 1,
        borderColor: COLORS.green,
        borderRadius: SIZES.base,
        paddingVertical: SIZES.spacing *1.8,
      }}>
      <Text
        style={{
          color: color,
          textAlign: 'center',
          fontWeight: 700,
          fontSize: SIZES.h2,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
