import * as type from "../types";
const initialState = {
  users: [],
  data: [],
  bank: null,
  amount_total: 0,
  receipt: null,
  parent: [],
  error: false,
  loading: false,
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
        receipt: null,
        amount_total: null,
        bank: null,
        error: true,
      };
    case type.SET_RECEIPT_SUCCESS:
      return {
        ...state,
        receipt: action.payload.receipt,
        amount_total: action.payload.amount_total,
        bank: action.payload.bank,
        error: false,
      };
    case type.SET_RECEIPT_LOADING:
      return {
        ...state,
        receipt: null,
        amount_total: null,
        bank: null,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};
