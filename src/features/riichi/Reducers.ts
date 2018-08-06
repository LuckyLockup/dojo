import {StringStoreState} from "src/common/utils";
import * as Actions from "src/features/riichi/Actions";
import {compareTiles, isGameStarted, NoGame, TableState} from "src/features/riichi/riichi";

import {combineReducers} from "redux";


interface RiichiTablesState extends StringStoreState<TableState> {
    allIds: ReadonlyArray<string>;
    byId: { [key: string]: TableState };
}

export const initialState: RiichiTablesState = {
    allIds: [],
    byId: {},
};


function allIds(state = initialState.allIds, action: Actions.All) {
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
        let updated= [...tiles.slice(0, index), ...tiles.slice(index+1)]
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
                        closedHand: updateHand(ps.payload.closedHand, ps.payload.currentTile, action.payload.tile),
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

function byId(state = initialState.byId, action: Actions.All) {
    switch (action.type) {
        case Actions.CreateTable:
            const noGame: NoGame = {tableId: action.payload.tableId};
            return {
                [action.payload.tableId]: noGame,
                ...state,
            };
        case Actions.RiichiState:
            return {
                ...state,
                [action.payload.tableId]: action.payload
            };
        case Actions.DiscardTile:
            const tableAfterDiscard = disardTile(state[action.payload.tableId], action);
            if (tableAfterDiscard) {
                return {
                    ...state,
                    [action.payload.tableId]: tableAfterDiscard
                }
            }
            return state;
        case Actions.TileDiscarded:
            const tableAfterNewDiscard = onDiscardTile(state[action.payload.tableId], action);
            if (tableAfterNewDiscard !== undefined) {
                return {
                    ...state,
                    [action.payload.tableId]: tableAfterNewDiscard
                }
            }
            return state;

        case Actions.TileFromWallTaken:
            const tableAfterNewTile = tileFromTheWallTaken(state[action.payload.tableId], action);
            if (tableAfterNewTile) {
                return {
                    ...state,
                    [action.payload.tableId]: tableAfterNewTile
                }
            }
            return state;

        default:
            return state;
    }
}


export default combineReducers({
    allIds,
    byId,
});