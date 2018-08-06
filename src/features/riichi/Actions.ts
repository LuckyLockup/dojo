//Actions to server
import {TableState} from "./riichi";

export const CreateTable = "CreateTable";
export const GetState = "GetState";
export const JoinAsPlayer = "JoinAsPlayer";
export const StartGame = "StartGame";
export const DiscardTile = "DiscardTile";
export const WsToServer = [
    GetState,
    JoinAsPlayer,
    StartGame,
    DiscardTile
];

//actions from server
export const RiichiState = "RiichiState";
export const TileDiscarded = "TileDiscarded";
export const TileFromWallTaken = "TileFromWallTaken";


//actions to server
export type CreateTableAction = {
    type: typeof CreateTable,
    payload: {
        tableId: string,
        userId: number,
    }
}

export type GetStateAction = {
    type: typeof GetState,
    payload: {
        tableId: string,
    }
}

export type JoinAsPlayerAction = {
    type: typeof JoinAsPlayer,
    payload: {
        tableId: string,
    }
}

export type StartGameAction = {
    type: typeof StartGame,
    payload: {
        tableId: string,
        gameId: number,
    }
}

export type DiscardTileAction = {
    type: typeof DiscardTile,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        tile: string,
    }
}

//actions from server
export type RiichiStateAction = {
    type: typeof RiichiState,
    payload: TableState,
}

export type TileDiscardedAction = {
    type: typeof TileDiscarded,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        position: string,
        tile: string,
    }
}

export type TileFromWallTakenAction = {
    type: typeof TileFromWallTaken,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        position: string,
        tile: string,
        commands: Array<any>,
    },
}

export type RiichiOut = CreateTableAction | DiscardTileAction

export type RiichiIn =
    RiichiStateAction
    | TileDiscardedAction
    | TileFromWallTakenAction

export type All = RiichiIn | RiichiOut