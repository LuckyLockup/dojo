import {RiichiState, CreateTable} from "../actions/ActionTypes";


export const TableReducer = (state = {}, action) => {
  switch (action.type) {
    case CreateTable:
      return Object.assign({}, state, {tableId : action.payload.tableId});
    case RiichiState:
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
};