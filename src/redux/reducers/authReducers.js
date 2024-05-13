import * as type from "../types";
const initialState = {
  authToken: null,
  isLoggedIn: false,
  user: null,
  classess: null,
  error: false,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  // console.log('action', action.)
  switch (action.type) {
    case type.SET_LOGIN_STATE:
      return {
        ...state,
        user: null,
        classes: null,
        authToken: null,
        error: false,
        isLoggedIn: false,
        isLoading: true,
      };
    case type.SET_LOGIN_SUCCESS: 
     return {
        ...state,
        user: action.payload.user,
        classes: action.payload.classes,
        authToken: action.payload.authToken,
        isLoggedIn: true,
        isLoading: false,
        error: false,
     }
    case type.SET_INITIAL_STATE:
      return {
        ...state,
        user: action.payload.user,
        classes: action.payload.classes,
        isLoggedIn: true,
        authToken: action.payload.authToken,
        isLoading: true,
      };
    case type.SET_REGISTER_STATE:
      return {
        ...state,
        user: action.payload.user,
        classes: action.payload.classes,
        isLoggedIn: false,
        authToken: action.payload.authToken,
        isLoading: true,
        error: false,
      };
    case type.SET_LOGOUT_STATE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        classes: null,
        authToken: null,
        isLoading: false,
        error: false
      };
    case type.SET_LOGIN_FAIL_STATE:
      return {
        ...state,
        error: true,
        authToken: null,
        isLoggedIn: false,
        user: null,
        classess: null,
        isLoading: false,
      };
    case type.SET_LOGIN_CLEAR_STATE:
      return {
        ...state,
        authToken: null,
        isLoggedIn: false,
        user: null,
        classess: null,
        error: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
