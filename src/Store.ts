import {createStore, applyMiddleware,  compose} from 'redux';
import rootReducer, {initialState} from 'src/State';
import thunk from "redux-thunk";
import {logger} from 'redux-logger';
import {ws} from "src/common/ws";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

export default () => {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(
            thunk,
            logger,
            ws
        )),
    );
}