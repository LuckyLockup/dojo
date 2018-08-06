export const Ping = "Ping";

export type PingAction = {
    type: typeof Ping,
    payload: {
        id: number,
    },
}

export const createPing = (id: number): PingAction => ({
    type: "Ping",
    payload: {
        id: id
    }

});
export type All = PingAction