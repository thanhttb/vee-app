import * as type from "../types"
const initialState = {
    classes: [],
    error: false,
    isLoadingClass: true
}

export const classReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SET_CLASS_STATE: 
            return {
                ...state,
                classes: [],
                error: false,
                isLoadingClass: true
            }
        case type.SET_CLASS_SUCCESS:
            return {
                ...state,
                classes: action.payload.data,
                error: false,
                isLoadingClass: false
            }
        case type.SET_CLASS_FAIL:
            return {
                ...state,
                classes: [],
                error: true,
                isLoadingClass: false
            }
        default:
            return state;
    }
}