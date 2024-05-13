import * as type from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../../config";

export const session_week = (id) => {
  return async (dispatch) => {
    dispatch({
      type: type.SET_SESSION_STATE,
      payload: {
        error: false,
        isLoading:true
      },
    });

    const access_token = await AsyncStorage.getItem("tokenUser");
    try {
      const response = await axios.post(
        BASE_URL + "session-week",
        {
          parent_id: id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );

      if (response.status == 200) {
        const  data  = response.data;
        dispatch({
          type: type.SET_SESSION_SUCCESS,
          payload: {
            data: data,
            error: false,
            isLoading: false
          },
        });
      }
    } catch (e) {
      dispatch({
        type: type.SET_SESSION_FAIL,
        payload: {
          data: [],
          error: true,
          isLoading: false
        },
      });
    }
  };
};
