import React from 'react'
import { View, Text } from 'react-native'
import { SIZES } from '../../utils/theme'

const VerticalDefault = () => {
  console.log('123')
  return (
    <View style={{
      backgroundColor: 'red',
      height: SIZES.height,
      width: SIZES.width

    }}><Text>VerticalDefault</Text></View>
  )
}

export default VerticalDefault