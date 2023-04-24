import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducers';
import { userReducer } from './reducers/userReducers';

const rootReducer = combineReducers({
    authReducer: authReducer,
    userReducer: userReducer
})

export const store = createStore(rootReducer,(applyMiddleware(thunk)))