import {combineReducers} from "redux";
import {pingReducer} from "./pingReducer";
import {tableReducer} from "./tableReducer";
import {userReducer} from "./userReducer";


//this is the list of final reducers
export default combineReducers({
  ping: pingReducer,
  table: tableReducer,
  user: userReducer,
})