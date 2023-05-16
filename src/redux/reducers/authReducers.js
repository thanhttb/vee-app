import * as type from "../types"
const initialState = {
    authToken: null,
    isLoggedIn: false,
    user: null,
    classess: null,
    error: false,
}

export const authReducer = (state = initialState, action) => {
    // console.log('action', action.)
    switch(action.type) {
        case type.SET_LOGIN_STATE:
            return {
                ...state,
                user: action.payload.user,
                classes: action.payload.classes,
                isLoggedIn: true,
                authToken: action.payload.authToken,
            }
        case type.SET_INITIAL_STATE:
            return {
                ...state,
                user: action.payload.user,
                classes: action.payload.classes,
                isLoggedIn: true,
                authToken: action.payload.authToken,
            }
        case type.SET_REGISTER_STATE:
            return {
                ...state,
                user: action.payload.user,
                classes: action.payload.classes,
                isLoggedIn: true,
                authToken: action.payload.authToken,
            }
        case type.SET_LOGOUT_STATE:
            return {
                ...state,
                isLoggedIn: false,
                user:null,
                classes:null,
                authToken: null,
            }
        case type.SET_LOGIN_FAIL_STATE:
            return {
                ...state,
                error: true,
                isLoggedIn: false,
            }
            case type.SET_LOGIN_CLEAR_STATE:
                return {
                    ...state,
                    error: false,
                    isLoggedIn: false,
                }
        default:
            return state;
    }
}