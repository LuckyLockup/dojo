import React from "react";
import {renderTile, renderTileInHand} from "./Tile";
import {
  Text,
  View,
} from 'react-native'

export const EnemyState = (hand) => {
  if (hand === undefined) {
    return <View/>
  }

  return <View>
    <Text>Position: {hand.payload.player.payload.position}</Text>
    <View style={{
      flexDirection: 'row'
    }}>
      <Text>Closed hand: </Text>
      {hand.payload.closedHand.map(t => renderTile(t))}
      <Text> </Text>
      <Text>{renderTile(hand.payload.currentTile)}</Text>
    </View>
    <View style={{
      flexDirection: 'row'
    }}>
      <Text>Discard: </Text>
      {hand.payload.discard.reverse().map(t => renderTile(t))}
    </View>
  </View>
};