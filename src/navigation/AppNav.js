import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import TabNavigation from './TabNavigation';


const AppNav = () => {
  return (
    <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
  )
}

export default AppNav