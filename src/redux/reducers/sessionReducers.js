import * as type from "../types"
const initialState = {
    data: [],
    error: false,
    isLoading: false
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SET_SESSION_STATE: 
            return {
                ...state,
                error: false,
                isLoading: true
            }
        case type.SET_SESSION_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                error: false,
                isLoading: false
            }
        case type.SET_SESSION_FAIL:
            return {
                ...state,
                data: [],
                error: true,
                isLoading: false
            }
        default:
            return state;
    }
}