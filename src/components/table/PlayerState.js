import React from "react";
import {renderTile, renderTileInHand} from "./Tile";
import {
  Text,
  View,
} from 'react-native'

export const PlayerState = (table, hand, onDiscardTile) => {
  if (hand === undefined) {
    return <Text>Loading player hand...</Text>;
  }
  const discardTile = tile => onDiscardTile(table.tableId, table.gameId, table.turn, tile);

  return <View>
    <Text>Position: {hand.payload.player.payload.position}</Text>
    <View style={{
      flexDirection: 'row'
    }}>
      <Text>Closed hand: </Text>
      {hand.payload.closedHand.map(t => renderTileInHand(t, discardTile))}
      <Text> </Text>
      <Text>{renderTileInHand(hand.payload.currentTile, discardTile)}</Text>
    </View>
    <View style={{
      flexDirection: 'row'
    }}>
      <Text>Discard: </Text>
      {hand.payload.discard.reverse().map(t => renderTile(t))}
    </View>
  </View>
};