import {combineReducers} from "redux";
import {PingReducer} from "./PingReducer";
import {TableReducer} from "./TableReducer";
import {UserReducer} from "./UserReducer";


//this is the list of final reducers
export default combineReducers({
  PingReducer,
  TableReducer,
  UserReducer,
})