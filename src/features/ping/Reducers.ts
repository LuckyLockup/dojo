import * as Actions from 'src/features/ping/Actions';

export interface PingState {
    readonly id: number;
}

export const initialState: PingState = {
    id: 1,
};

export default (state: PingState = initialState, action: Actions.All) => {
    switch (action.type) {
        case Actions.Ping:
            return {
                id: state.id + 1
            };
        default:
            return state;
    }
}