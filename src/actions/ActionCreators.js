import * as t from "./ActionTypes";


export const createTable = (tableId, userId) => {
  return {
    type: t.CreateTable,
    payload: {
      tableId: tableId,
      userId: userId,
    }
  }
};

export const getState = (tableId) => {
  return {
    type: t.GetState,
    payload: {
      tableId: tableId,
    }
  }
};

export const joinTable = (tableId) => {
  return {
    type: t.JoinAsPlayer,
    payload: {
      tableId: tableId,
    }
  }
};

export const startGame = (tableId) => {
  return {
    type: t.StartGame,
    payload: {
      tableId: tableId,
      gameId: Math.floor(Math.random() * 900) + 100
    }
  }
};

export const discardTile = (tableId, gameId, turn, tile) => {
  return {
    type: t.DiscardTile,
    payload: {
      tableId: tableId,
      gameId: gameId,
      turn: turn,
      tile: tile
    }
  }
};