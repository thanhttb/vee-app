import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducers';

const rootReducer = combineReducers({
    authReducer: authReducer
})

export const store = createStore(rootReducer,(applyMiddleware(thunk)))