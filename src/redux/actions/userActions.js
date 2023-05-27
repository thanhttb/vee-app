import * as type from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../../config";

export const userList = (id) => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("tokenUser");
    try {
      const response = await axios.post(
        BASE_URL + "profile",
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
        const { students, parent, data } = response.data;
        dispatch({
          type: type.SET_USER_SUCCESS,
          payload: {
            users: students,
            parent: parent,
            data: data,
            error: false,
          },
        });
      }
    } catch (e) {
      console.log("login failed", e);
      dispatch({
        type: type.SET_USER_FAIL,
        payload: {
          users: [],
          parent: [],
          data: [],
          error: true,
        },
      });
    }
  };
};

export const userReceipt = (id) => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("tokenUser");
    try {
      const response = await axios.post(
        BASE_URL + "fee",
        {
          students: [id],
          show_all: true
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );

      if (response.status == 200) {
        // const { data } = response.original.detail;
        const data =response.data.original;
        const amount_total =response.data.original.amount_total;
        // console.log('original',response.data.original.detail)
        dispatch({
          type: type.SET_RECEIPT_SUCCESS,
          payload: {
            receipt: data,
            amount_total: amount_total,
            error: false,
          },
        });
      }
    } catch (e) {
      console.log("RECEIPT_ failed", e);
      dispatch({
        type: type.SET_RECEIPT_FAIL,
        payload: {
          receipt: [],
          amount_total: 0,
          error: true,
        },
      });
    }
  };
};
