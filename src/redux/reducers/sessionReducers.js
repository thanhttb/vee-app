import * as type from "../types"
const initialState = {
    data: [],
    error: false,
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SET_SESSION_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                error: false,
            }
        case type.SET_SESSION_FAIL:
            return {
                ...state,
                data: [],
                error: true,
            }
        default:
            return state;
    }
}