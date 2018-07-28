import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

export const renderTile = (tile) => {
  if (tile === undefined || tile.length < 1) {
    return <View/>
  }

  return <Image
      style={{width: 40, height: 50}}
      source={'/assets/riichi/' + tile + ".png"}
  />;
};

export const renderTileInHand = (tile, onClick) => {
  if (tile === undefined || tile.length < 1) {
    return <View/>
  }

  return <TouchableOpacity onPress={() => onClick(tile)}>
    <Image
        style={{width: 40, height: 50}}
        source={'/assets/riichi/' + tile + ".png"}
    />
  </TouchableOpacity>
};