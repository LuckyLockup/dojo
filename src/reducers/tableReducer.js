import {RiichiState, CreateTable, TileDiscarded, TileFromWallTaken} from "../actions/ActionTypes";


export const tableReducer = (state = {}, action) => {
  switch (action.type) {
    case RiichiState:
      var tables = {};
      tables[action.payload.tableId] = action.payload;
      return Object.assign({}, state, tables);
    case TileDiscarded:
      if (state[action.payload.tableId] === undefined ||
          state[action.payload.tableId].gameId != action.payload.gameId) {
        console.log("wrong data", state[action.payload.tableId], action.payload.gameId);
        return state;
      }
      const updatedStates = state[action.payload.tableId].states.map(ps => {
        if (ps.payload.player.payload.position != action.payload.position) {
          return ps;
        }
        ps.payload.closedHand.push(ps.payload.currentTile);
        const toRemove = ps.payload.closedHand.findIndex(t => t === action.payload.tile);
        ps.payload.closedHand.splice(toRemove, 1);
        ps.payload.closedHand.sort();
        ps.payload.currentTile = "";
        ps.payload.discard.push(action.payload.tile);
        return ps;
      });

      const updatedTable = Object.assign({},
          state[action.payload.tableId],
          {
            turn: action.payload.turn + 1,
            states: updatedStates
          }
      );
      var tables = {};
      tables[action.payload.tableId] = updatedTable;
      return Object.assign({}, state, tables);

    case TileFromWallTaken:
      if (state[action.payload.tableId] === undefined ||
          state[action.payload.tableId].gameId != action.payload.gameId) {
        console.log("wrong data", state[action.payload.tableId], action.payload.gameId);
        return state;
      }

      const updatedStates2 = state[action.payload.tableId].states.map(ps => {
        if (ps.payload.player.payload.position != action.payload.position) {
          return ps;
        }
        ps.payload.currentTile = action.payload.tile;
        return ps;
      });
      const updatedTable2 = Object.assign({},
          state[action.payload.tableId],
          {
            turn: action.payload.turn + 1,
            states: updatedStates2,
          }
      );
      var tables2 = {};
      tables2[action.payload.tableId] = updatedTable2;
      return Object.assign({}, state, tables2);

    default:
      return state
  }
};