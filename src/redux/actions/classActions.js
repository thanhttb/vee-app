import * as type from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../../config";

export const listClass = (id) => {
  return async (dispatch) => {

    dispatch({
      type: type.SET_CLASS_STATE,
      payload: {
        data: [],
        error: false,
        isLoadingClass: false
      },
    });


    const access_token = await AsyncStorage.getItem("tokenUser");
    try {
      const response = await axios.get(BASE_URL + "classes", {
        params: {
          parent_id: id,
        },

        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      });

      if (response.status == 200) {
        const data = response.data;
        dispatch({
          type: type.SET_CLASS_SUCCESS,
          payload: {
            data: data,
            error: false,
            isLoadingClass: false
          },
        });
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log("login failed class", e);
      dispatch({
        type: type.SET_CLASS_FAIL,
        payload: {
          data: [],
          error: true,
          isLoadingClass: false
        },
      });
    }
  };
};
