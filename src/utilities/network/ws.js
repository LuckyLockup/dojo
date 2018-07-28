import {DiscardTile, GetState, JoinAsPlayer, StartGame} from "../../actions/ActionTypes";
import {config} from "../config/config";

let socket;
let connected = false;

export const init = ( store ) => {
  const userId = store.getState().user.userId;
  start(store, config.wsUrl + userId);
};

function start(store, uri){
  socket = new WebSocket(uri);

  socket.onopen = function (event) {
    connected = true;
    console.log("Connection open", event);
  };

  socket.onmessage = function(event) {
    const action = JSON.parse(event.data);
    console.log("WS <<", action);
    store.dispatch(action);
  };

  socket.onerror = function(err) {
    console.error("WS error ", err);
  };

  socket.onclose = function(){
    console.log("WS is closed");
    connected = false;
    // Try to reconnect in 1 second
    setTimeout(function(){start(store, uri)}, 1000);
  };
}

export const ws = store => next => action => {
  const allowedMsgs = [
      GetState,
      JoinAsPlayer,
      StartGame,
      DiscardTile,
  ];

  if (allowedMsgs.includes(action.type)) {
    if (!connected) {
      console.log("WS will not be sent, ws is not connected", action)
    }
    console.log("WS >>", action.type);
    socket.send(JSON.stringify(action))
  }
  return next(action);
};