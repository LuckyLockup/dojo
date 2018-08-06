import * as Actions from "src/features/user/Actions";

interface UserState {
    readonly userId: number;
}

export const initialState: UserState = {
    userId: 42,
    // userId: Math.floor(Math.round(10000))
};

export default (state: UserState = initialState, action: Actions.All) => {
    switch (action.type) {
        default:
            return state;
    }
}