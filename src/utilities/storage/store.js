import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../reducers/RootReducer";
import { logger } from 'redux-logger'
import {api} from "../network/api";
import {ws, init} from "../network/ws";

let initialState = {};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(
        thunk,
        logger,
        api,
        ws
    )));

init(store);

export default store;