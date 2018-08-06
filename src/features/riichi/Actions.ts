//Actions to server
import {GameScore, HandValue, RiichiConfig, TableState, WsDeclaredSet} from "./riichi";
import * as position from './positions'

export const CreateTable = "CreateTable";
export const GetState = "GetState";
export const JoinAsPlayer = "JoinAsPlayer";
export const StartGame = "StartGame";
export const DiscardTile = "DiscardTile";
export const DeclareRon = "DeclareRon";
export const DeclareTsumo = "DeclareTsumo";
export const SkipAction = "SkipAction";
export const ClaimPung = "ClaimPung";
export const ClaimChow = "ClaimChow";
export const Skip = "Skip";
export const WsToServer = [
    GetState,
    JoinAsPlayer,
    StartGame,
    DiscardTile,
    DeclareRon,
    DeclareTsumo,
    SkipAction,
    ClaimChow,
    ClaimPung,
    Skip,
];

//actions from server
export const RiichiState = "RiichiState";
export const TileDiscarded = "TileDiscarded";
export const TileFromWallTaken = "TileFromWallTaken";
export const RonDeclared = "RonDeclared";
export const TsumoDeclared = "TsumoDeclared";
export const GameScored = "GameScored";
export const TileClaimed = "TileClaimed";


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
        config?: RiichiConfig
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

//claiming
export interface DeclareRonAction {
    type: typeof DeclareRon,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        approximateHandValue: HandValue,
    }
}

export interface DeclareTsumoAction {
    type: typeof DeclareTsumo,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        approximateHandValue: HandValue,
    }
}

export interface ClaimPungAction {
    type: typeof ClaimPung,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
    }
}

export interface ClaimChowAction {
    type: typeof ClaimChow,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        tile: string,
        tiles: Array<string>
    }
}

export type ClaimingAction = DeclareRonAction
    | DeclareRonAction
    | DeclareTsumoAction
    | ClaimChowAction
    | ClaimPungAction;

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
        position: position.Position,
        tile: string,
        commands: Array<ClaimingAction>
    }
}

export type TileFromWallTakenAction = {
    type: typeof TileFromWallTaken,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        position: position.Position,
        tile: string,
        commands: Array<any>,
    },
}

export type RonDeclaredAction = {
    type: typeof RonDeclared,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        position: position.Position,
    },
}

export type TsumoDeclaredAction = {
    type: typeof TsumoDeclared,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        position: position.Position,
    },
}


export const Chow = "chow";
export const Pung ="pung";
export type SetName = typeof Chow | typeof Pung;

export interface TileClaimedAction {
    type: typeof TileClaimed,
    payload: {
        tableId: string,
        gameId: number,
        setName: SetName,
        position: position.Position,
        set: WsDeclaredSet
    }
}

export interface GameScoredAction {
    type: typeof GameScored,
    payload: {
        tableId: string,
        gameId: number,
        turn: number,
        score: GameScore,
    }
}

export type WinAction = RonDeclaredAction | TsumoDeclaredAction | GameScoredAction

export type RiichiOut = CreateTableAction
    | DiscardTileAction
    | ClaimingAction

    | TsumoDeclaredAction

export type RiichiIn =
    RiichiStateAction
    | TileDiscardedAction
    | TileFromWallTakenAction
    | WinAction
    | TileClaimedAction


export type All = RiichiIn | RiichiOut