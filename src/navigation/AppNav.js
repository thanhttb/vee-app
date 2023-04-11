import React, {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppStack from './AppStack';
import TabNavigation from './TabNavigation';
import {initialize} from '../redux/actions/authActions'
import { View,ActivityIndicator,StatusBar } from 'react-native';

const AppNav = () => {
  const {authToken, user} = useSelector(state => state.authReducer);
  const [loading, setLoading] = useState(true);
  const dispath = useDispatch()
  const init = async () => {
    await dispath(initialize());
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="small" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='black' barStyle="light-content" />
      {
        authToken == undefined || authToken == null ?
        <AppStack/>   : <TabNavigation />
      }
                                                  
    </NavigationContainer>
  )
}

export default AppNav