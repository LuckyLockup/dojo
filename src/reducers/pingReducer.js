import {Ping} from "../actions/ActionTypes";

export const pingReducer = (state = {pingId: 10}, action) => {
  switch (action.type) {
    case Ping:
      return Object.assign({}, state, {
        pingId: state.pingId++,
        timestamp: Date.now()
      });
    default:
      return state
  }
};