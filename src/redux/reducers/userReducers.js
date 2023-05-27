import * as type from "../types";
const initialState = {
  users: [],
  data: [],
  amount_total: 0,
  receipt: null,
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
        amount_total: action.payload.amount_total,
        error: false,
      };
    case type.SET_USER_FAIL:
      return {
        ...state,
        users: [],
        parent: [],
        data: [],
        amount_total: 0,
        error: true,
      };

    case type.SET_RECEIPT_FAIL:
      return {
        ...state,
        receipt: null,
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
