import React from 'react'
import {Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login/Login';
import PasswordForgot from '../screens/Login/PasswordForgot';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="PasswordForgot" component={PasswordForgot}/>
    </Stack.Navigator>
  )
}

export default AppStack