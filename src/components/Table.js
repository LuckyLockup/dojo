import React, {PureComponent} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as domain from '../domain/domain'
import {discardTile, getState, joinTable, startGame} from "../actions/ActionCreators";
import {withRouter} from 'react-router'
import {renderTile, renderTileInHand} from "./table/Tile";


const TablePure = ({
                     table,
                     onGetState,
                     onJoinTable,
                     onStartGame,
                     onDiscardTile,
                     location
                   }) => {
  const tableId = location.pathname.split("/").pop();

  return <View>
    <Button
        onPress={() => onGetState(tableId)}
        title="Get state"
        color="#841584"
        style={{
          flex: 1,
        }}
    />
    <Button
        onPress={() => onJoinTable(tableId)}
        title="Join Game"
        color="#078919"
        style={{
          flex: 1,
        }}
    />
    <Button
        onPress={() => onStartGame(tableId)}
        title="Start Game"
        color="#33FF4F"
        style={{
          flex: 1,
        }}
    />
    {playerState(table, onDiscardTile)}
    {otherHands(table)}
    <Text>Under the table</Text>
  </View>;
};

const playerState = (table, onDiscardTile) => {
  if (table === undefined || table.states === undefined) {
    return <Text>Loading player hand...</Text>;
  }
  let hand = domain.playerState(table.states[0]);

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


const otherHands = (table) => {
  if (table === undefined || table.states === undefined || table.states.slice(1) === undefined) {
    return <View/>;
  }
  return <View>
    {table.states.slice(1).map(hand => enemyState(hand))}
  </View>
};

const enemyState = (hand) => {
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




TablePure.propTypes = {
  table: PropTypes.object.isRequired,
  onGetState: PropTypes.func.isRequired,
  onJoinTable: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onDiscardTile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({table, user}) => ({
  table,
});

const mapDispatchToProps = dispatch => ({
  onGetState: (tableId) => dispatch(getState(tableId)),
  onJoinTable: (tableId) => dispatch(joinTable(tableId)),
  onStartGame: (tableId) => dispatch(startGame(tableId)),
  onDiscardTile: (tableId, gameId, turn, tile) => dispatch(discardTile(tableId, gameId, turn, tile))
});

export const Table = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TablePure));
