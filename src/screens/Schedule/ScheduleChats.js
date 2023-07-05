import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../../../firebase";

import { Ionicons } from '@expo/vector-icons';

export const ScheduleChats = ({ route, navigation }) => {
  const [usersList, setUserList] = useState([]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={navigation.dispatch(CommonActions.goBack())}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  return <Text>ScheduleChats</Text>;
};
