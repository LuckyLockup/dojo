import {StringStoreState} from "src/common/utils";
import * as Actions from "src/features/riichi/Actions";
import {compareTiles, isGameStarted, NoGame, TableState} from "src/features/riichi/riichi";

import {combineReducers, Reducer} from "redux";
import {TableView} from "./riichi";


interface RiichiTablesState extends StringStoreState<TableView> {
    allIds: ReadonlyArray<string>;
    byId: { [key: string]: TableView };
}

export const initialState: RiichiTablesState = {
    allIds: [],
    byId: {},
};


function allIds(state = initialState.allIds, action: Actions.All): ReadonlyArray<string> {
    switch (action.type) {
        case Actions.CreateTable:
        case Actions.RiichiState:
            if (state.some(id => id === action.payload.tableId)) {
                return state;
            }
            return [...state, action.payload.tableId];
        default:
            return state;

    }
}

const disardTile = (table: TableState | undefined,
                    action: Actions.DiscardTileAction): TableState | undefined => {
    return undefined;
};

const onDiscardTile = (table: TableState | undefined,
                       action: Actions.TileDiscardedAction): TableState | undefined => {

    function updateHand(tiles: Array<string>, currentTile: string | undefined, tileToDiscard: string) {
        if (tileToDiscard === currentTile) {
            return tiles;
        }
        const index: number = tiles.indexOf(tileToDiscard);
        if (index == -1) {
            return tiles;
        }
        let updated = [...tiles.slice(0, index), ...tiles.slice(index + 1)]
        if (currentTile) {
            updated.push(currentTile)
        }
        return updated.sort(compareTiles);
    }

    if (isGameStarted(table) && table.turn == action.payload.turn && table.gameId == action.payload.gameId) {
        const playerState = table.states.map(ps => {
            if (ps.payload.player.payload.position === action.payload.position) {
                return {
                    type: ps.type,
                    payload: {
                        ...ps.payload,
                        discard: [...ps.payload.discard, action.payload.tile],
                        closedHand: updateHand(ps.payload.closedHand, ps.payload.currentTile,
                            action.payload.tile),
                        currentTile: undefined,
                    }
                }
            }
            return ps;
        });
        return {
            ...table,
            states: playerState,
            turn: table.turn + 1,
        }
    }
    return undefined;
};

const tileFromTheWallTaken = (table: TableState | undefined,
                              action: Actions.TileFromWallTakenAction): TableState | undefined => {
    if (isGameStarted(table) && table.turn == action.payload.turn && table.gameId == action.payload.gameId) {
        const playerState = table.states.map(ps => {
            if (ps.payload.player.payload.position === action.payload.position) {
                return {
                    type: ps.type,
                    payload: {
                        ...ps.payload,
                        currentTile: action.payload.tile,
                    }
                }
            }
            return ps;
        });
        return {
            ...table,
            states: playerState,
            turn: table.turn + 1,
        }
    }
    return undefined;
};

const claimTile = (table: TableState | undefined, action: Actions.TileClaimedAction): TableState | undefined => {
    if (isGameStarted(table) && table.turn == action.payload.set.payload.turn && table.gameId == action.payload.gameId) {
        const playerState = table.states.map(ps => {
            const playerPosition = ps.payload.player.payload.position;
            if (playerPosition === action.payload.position) {
                return {
                    type: ps.type,
                    payload: {
                        ...ps.payload,
                        openHand: [...ps.payload.openHand, action.payload.set],
                    }
                }
            } else if (playerPosition == action.payload.set.payload.from) {
                return {
                    type: ps.type,
                    payload: {
                        ...ps.payload,
                       discard: [...ps.payload.discard.slice(0, -1)]
                    }
                }
            }
            return ps;
        });
        return {
            ...table,
            states: playerState,
            turn: table.turn + 1,
        }
    }
    return undefined;
};

function byId(state = initialState.byId, action: Actions.All): { [key: string]: TableView } {
    switch (action.type) {
        case Actions.CreateTable:
            const noGame: NoGame = {tableId: action.payload.tableId};
            return {
                [action.payload.tableId]: {table: noGame, commands: []},
                ...state,
            };
        case Actions.RiichiState:
            return {
                ...state,
                [action.payload.tableId]: {
                    ...state[action.payload.tableId],
                    table: action.payload
                }
            };
        case Actions.DiscardTile:
            if (state[action.payload.tableId]) {
                const tableAfterDiscard = disardTile(state[action.payload.tableId].table, action);
                if (tableAfterDiscard) {
                    return {
                        ...state,
                        [action.payload.tableId]: {
                            ...state[action.payload.tableId],
                            table: tableAfterDiscard
                        }
                    };
                }
            }
            return state;
        case Actions.TileDiscarded:
            if (state[action.payload.tableId]) {
                const tableAfterNewDiscard = onDiscardTile(state[action.payload.tableId].table, action);
                if (tableAfterNewDiscard !== undefined) {
                    return {
                        ...state,
                        [action.payload.tableId]: {
                            ...state[action.payload.tableId],
                            commands: action.payload.commands,
                            table: tableAfterNewDiscard
                        }
                    }
                }
            }
            return state;

        case Actions.TileFromWallTaken:
            if (state[action.payload.tableId]) {
                const tableAfterNewTile = tileFromTheWallTaken(state[action.payload.tableId].table, action);
                if (tableAfterNewTile) {
                    return {
                        ...state,
                        [action.payload.tableId]: {
                            ...state[action.payload.tableId],
                            commands: action.payload.commands,
                            table: tableAfterNewTile
                        }
                    }
                }
            }
            return state;
        case Actions.RonDeclared:
            if (state[action.payload.tableId]) {
                return {
                    ...state,
                    [action.payload.tableId]: {
                        ...state[action.payload.tableId],
                        commands: [],
                        gameEnded: action.payload.position + " declared ron"
                    }
                }
            }
            return state;

        case Actions.TsumoDeclared:
            if (state[action.payload.tableId]) {
                return {
                    ...state,
                    [action.payload.tableId]: {
                        ...state[action.payload.tableId],
                        commands: [],
                        gameEnded: action.payload.position + " declared tsumo"
                    }
                }
            }
            return state;

        case Actions.TileClaimed:
            if (state[action.payload.tableId]) {
                const tableAfterClaim = claimTile(state[action.payload.tableId].table, action);
                if (tableAfterClaim) {
                    return {
                        ...state,
                        [action.payload.tableId]: {
                            ...state[action.payload.tableId],
                            commands: [],
                            table: tableAfterClaim
                        }
                    }
                }
            }
            return state;
        default:
            return state;
    }
}


export const reducer: Reducer<RiichiTablesState> = combineReducers({
    allIds,
    byId,
});

export default reducer;