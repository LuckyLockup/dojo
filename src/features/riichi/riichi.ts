import {User} from "src/features/user/user";
import {TestingState} from "./test";
import {ClaimingAction} from "./Actions";
import {Position} from "./positions";

export interface NoGame {
    tableId: string;
}

export interface Game {
    tableId: string;
    gameId: number,
    admin: User;
    states: Array<PlayerState>,
    uraDoras: Array<string>
    deck: number,
    turn: number,
}

export type TableState = NoGame | Game

export interface TableView {
    table: TableState,
    commands: Array<ClaimingAction>,
    gameEnded?: string,
}

export function isGameStarted(game: TableState | undefined): game is Game {
    return game !== undefined && (<Game>game).states !== undefined &&  (<Game>game).states.length > 0;
}


export const HumanPlayer = "HumanPlayer";
export const AIPlayer = "AIPlayer";
export type PlayerType = typeof HumanPlayer | typeof  AIPlayer;

export const AIDuck = "Duck";
export type AIType = typeof AIDuck;

export interface Player {
    type: PlayerType,
    payload: {
        user: User,
        position: Position,
    }
}

export const RiichiPlayerState = "RiichiPlayerState";

export interface PlayerState {
    type: typeof RiichiPlayerState,
    payload: {
        readonly player: Player,
        readonly closedHand: Array<string>,
        readonly currentTile?: string,
        readonly openHand: Array<WsDeclaredSet>,
        readonly discard: Array<string>,
        readonly online: boolean,
    }
}

const ordering = {
    'east': 1,
    'south': 5,
    'west': 9,
    'north': 13,
    'white': 17,
    'green': 21,
    'red': 25,
    '1_pin': 29,
    '2_pin': 33,
    '3_pin': 37,
    '4_pin': 41,
    '5_pin': 45,
    '6_pin': 49,
    '7_pin': 53,
    '8_pin': 57,
    '9_pin': 61,
    '1_sou': 65,
    '2_sou': 69,
    '3_sou': 73,
    '4_sou': 77,
    '5_sou': 81,
    '6_sou': 85,
    '7_sou': 89,
    '8_sou': 93,
    '9_sou': 97,
    '1_wan': 101,
    '2_wan': 105,
    '3_wan': 109,
    '4_wan': 113,
    '5_wan': 117,
    '6_wan': 121,
    '7_wan': 125,
    '8_wan': 129,
    '9_wan': 133,
    'x': 200
};

export function compareTiles(a: string, b: string) {
    const orderA = ordering[a] ? ordering[a] : 0;
    const orderB = ordering[b] ? ordering[b] : 0;
    return orderA - orderB;
}

export interface RiichiConfig {
    type:  "RiichiConfig";
    payload: {
        defaultEastAi?: AIType,
        defaultSouthAi?: AIType,
        defaultWestAi?: AIType,
        defaultNorthAi?: AIType,
        nextTileDelay?: string,
        turnDuration?: string,
        testingTiles?: TestingState
    }
}

export interface HandValue {
    type: "HandValue",
    payload: {
        miniPoints: number,
        yakus: number,
    }
}

export interface GameScore {
    type: "GameScore",
    payload: {
        winner: Position,
        points: {}
    }
}

export interface WsDeclaredSet {
    type: "WsDeclaredSet",
    payload: {
        claimedTile: string,
        tails: Array<string>,
        from: Position,
        turn: number,
    }
}