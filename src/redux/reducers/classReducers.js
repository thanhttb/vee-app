import * as type from "../types"
const initialState = {
    classes: [],
    error: false,
}

export const classReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SET_CLASS_SUCCESS:
            return {
                ...state,
                classes: action.payload.data,
                error: false,
            }
        case type.SET_CLASS_FAIL:
            return {
                ...state,
                classes: [],
                error: true,
            }
        default:
            return state;
    }
}