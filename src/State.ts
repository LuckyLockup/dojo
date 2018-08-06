import {combineReducers} from 'redux'

import ping, {initialState as PingState} from 'src/features/ping/Reducers'
import user, {initialState as UserState} from 'src/features/user/Reducers'
import riichi, {initialState as RiichiState} from 'src/features/riichi/Reducers' //


export interface DojoState {
    ping: typeof PingState
    user: typeof UserState,
    riichi: typeof RiichiState,
}

export const initialState: DojoState = {
    ping: PingState,
    user: UserState,
    riichi: RiichiState,
};

export default combineReducers<DojoState>({
    ping,
    user,
    riichi,
});