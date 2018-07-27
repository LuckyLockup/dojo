/*
 "payload": {
          "player": {
            "type": "HumanPlayer",
            "payload": {
              "user": {
                "id": 2594,
                "nickname": "Akagi"
              },
              "position": "EastPosition"
            }
          },
 */
const _playerState = {
  type: "RiichiPlayerState",
  payload: {
    player: {
      type: "HumanPlayer",
      payload: {
        position: ""
      }
    },
    closedHand: [],
    openHand: [],
    discard: []
  }
};

export const playerState = (obj) => Object.assign({}, _playerState, obj);