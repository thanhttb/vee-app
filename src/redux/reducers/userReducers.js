import * as type from "../types"
const initialState = {
    users: [],
    data: [],
    parent:[],
    error: false,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SET_USER_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                data: action.payload.data,
                parent: action.payload.parent,
                error: false,
            }
        case type.SET_USER_FAIL:
            return {
                ...state,
                users: [],
                parent: [],
                data: [],
                error: true,
            }
        default:
            return state;
    }
}