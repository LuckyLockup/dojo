import {combineReducers} from "redux";
import SampleReducer from "./sampleReducer";
import {pingReducer} from "./pingReducer";


//this is the list of final reducers
export default combineReducers({
  SampleReducer,
  pingReducer,
})