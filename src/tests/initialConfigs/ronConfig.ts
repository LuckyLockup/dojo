import {RiichiConfig} from "src/features/riichi/riichi";


const ronConfig: RiichiConfig = {
  "type": "RiichiConfig",
  "payload": {
    "defaultEastAi": "Duck",
    "defaultSouthAi": "Duck",
    "defaultWestAi": "Duck",
    "defaultNorthAi": "Duck",
    "nextTileDelay": "10 seconds",
    "turnDuration": "300 seconds",
    "testingTiles": {
      "type": "TestingState",
      "payload": {
        "eastHand": [
          "3_pin",
          "west",
          "1_wan",
          "2_wan",
          "3_wan",
          "4_wan",
          "5_wan",
          "6_wan",
          "7_wan",
          "8_wan",
          "9_wan",
          "green",
          "green",
          "green"
        ],
        "southHand": [
          "north",
          "north",
          "4_sou",
          "4_sou",
          "red",
          "2_sou",
          "3_sou",
          "1_sou",
          "2_sou",
          "3_sou",
          "1_sou",
          "2_sou",
          "3_sou"
        ],
        "westHand": [],
        "northHand": [],
        "uraDoras": [],
        "deadWall": [],
        "wall": [
          "3_pin"
        ]
      }
    }
  }
};


export default ronConfig;