import * as type from "../types";
const initialState = {
  users: [],
  data: [],
  receipt: [],
  parent: [],
  error: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        data: action.payload.data,
        parent: action.payload.parent,
        error: false,
      };
    case type.SET_USER_FAIL:
      return {
        ...state,
        users: [],
        parent: [],
        data: [],
        error: true,
      };

    case type.SET_RECEIPT_FAIL:
      return {
        ...state,
        receipt: [],
        error: true,
      };
    case type.SET_RECEIPT_SUCCESS:
      return {
        ...state,
        receipt: action.payload.receipt,
        error: false,
      };
    default:
      return state;
  }
};
