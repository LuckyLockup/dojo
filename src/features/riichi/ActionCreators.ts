import * as A from "./Actions";
import {DiscardTileAction} from "./Actions";
// import testConfig from "src/tests/initialConfigs/chowConfig"

export const createTableAction = (tableId: string, userId: number): A.CreateTableAction => {
    return {
        type: A.CreateTable,
        payload: {
            tableId: tableId,
            userId: userId,
        }
    }
};

export const getState = (tableId: string): A.GetStateAction => {
    return {
        type: A.GetState,
        payload: {
            tableId: tableId,
        }
    }
};

export const joinTable = (tableId: string): A.JoinAsPlayerAction => {
    return {
        type: A.JoinAsPlayer,
        payload: {
            tableId: tableId,
        }
    }
};

export const startGame = (tableId: string): A.StartGameAction => {
    return {
        type: A.StartGame,
        payload: {
            tableId: tableId,
            gameId: Math.floor(Math.random() * 900) + 100,
            // config: testConfig,
        }
    }
};

export const discardTile = (tableId: string, gameId: number, turn: number,
                            tile: string): DiscardTileAction =>({
        type: A.DiscardTile,
        payload: {
            tableId: tableId,
            gameId: gameId,
            turn: turn,
            tile: tile,
        }
    });
