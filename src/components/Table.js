import React, {Component} from "react";
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
import {discardTile, getState, joinTable, startGame} from "../actions/ActionCreators";
import {withRouter} from 'react-router'
import {PlayerState} from "./table/PlayerState";
import {EnemyState} from "./table/EnemyState";
import * as domain from "../domain/domain";


class _Table extends Component {
  tableId = this.props.location.pathname.split("/").pop();

  render() {
    const table = this.props.tables[this.tableId];
    return <View>
      <Button
          onPress={() => this.props.onGetState(this.tableId)}
          title="Get state"
          color="#841584"
          style={{
            flex: 1,
          }}
      />
      <Button
          onPress={() => this.props.onJoinTable(this.tableId)}
          title="Join Game"
          color="#078919"
          style={{
            flex: 1,
          }}
      />
      <Button
          onPress={() => this.props.onStartGame(this.tableId)}
          title="Start Game"
          color="#33FF4F"
          style={{
            flex: 1,
          }}
      />
      {playerState(table, this.props.onDiscardTile)}
      {otherHands(table)}
      <Text>Under the table</Text>
    </View>;
  }
}

_Table.propTypes = {
  tables: PropTypes.object.isRequired,
  onGetState: PropTypes.func.isRequired,
  onJoinTable: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onDiscardTile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const otherHands = (table) => {
  if (table === undefined || table.states === undefined || table.states.slice(1) === undefined) {
    return <View/>;
  }
  return <View>
    {table.states.slice(1).map(hand => EnemyState(hand))}
  </View>
};

const playerState = (table, onDiscardTile) => {
  if (table === undefined || table.states === undefined || table.states.length < 1) {
    return <View/>;
  }

  let hand = domain.playerState(table.states[0]);
  return PlayerState(table, hand, onDiscardTile)
};


const mapStateToProps = ({tables, user}) => ({
  tables: tables,
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
)(_Table));
