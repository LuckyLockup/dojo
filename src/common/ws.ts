import {WsToServer} from "src/features/riichi/Actions";
import {config} from "./config";
import {DojoState} from "../State";
import {Action, AnyAction, Dispatch, Store} from "redux";


let socket: WebSocket | undefined = undefined;
let connected = false;

var messages: Array<Action> = [];

export const init = ( store: Store<DojoState, Action> ) => {
    const userId = store.getState().user.userId;
    start(store, config.wsUrl + userId);
};

const start = (store: Store<DojoState, Action>, uri: string) => {
    socket = new WebSocket(uri);

    socket.onopen = function (event) {
        connected = true;
        console.log("Connection open", event);
        if (socket && messages.length != 0) {
            console.log(`Sending ${messages.length} queued messages `);
            try {
                messages.forEach(act => socket!.send(JSON.stringify(act)));
            } catch(e) {
                console.log(e);
            }
            messages = [];
        }
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

export const ws = (store: Store<DojoState, Action>) => (next:Dispatch<AnyAction>) => (action: Action) => {

    //it might be here use hashSet
    if (WsToServer.some(t => t === action.type)) {
        if (connected && socket) {
            console.log("WS >>", action.type);
            socket.send(JSON.stringify(action))
        }
        console.log("WS will be sent later, ws is not connected", action);
        messages.push(action);
    }

    return next(action);
};