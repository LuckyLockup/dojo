import React from "react";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Ping} from "../actions/ActionTypes";

const LobbyPure = ({pingId, onPingClick}) => (
    <View style={styles.scrollViewContainer}>
      <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
          scrollEventThrottle={16} // ~60 events per second
          style={styles.scrollViewStyle}
      >
        {Array.from({ length: 20 }).map((item, i) => (
            <TouchableHighlight
                key={i}
                onPress={() => {console.log("Clicking on game")}}
                style={[styles.box, styles.horizontalBox]}
            >
              <Text>{i}</Text>
            </TouchableHighlight>
        ))}
      </ScrollView>
      <View style={{
        display: "flex",
        backgroundColor: "#848441",
        flexDirection: 'row',
        flexShrink: 0,
      }}>
        <Text style={{
          flex: 6,
          alignContent: "center",
          backgroundColor: "#847f74",
        }}>Footer</Text>
        <Button
            onPress={onPingClick}
            title="Ping"
            color="#841584"
            style={{
              flex: 4,
            }}
        />
        <Text style={{
          flex: 4,
        }}>{pingId}</Text>
      </View>
    </View>
);

const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  scrollViewContainer: {
    flex: 1
  },
  scrollViewStyle: {
    borderWidth: 1,
    marginBottom: '1.3125rem'
  },
  scrollViewContentContainerStyle: {
    backgroundColor: '#eee',
    padding: 10
  }
});


LobbyPure.propTypes = {
  pingReducer: PropTypes.object,
  pingId: PropTypes.number.isRequired,
  onPingClick: PropTypes.func.isRequired
};

const mapStateToProps = ({ping}) => ({
  pingId: ping.pingId,
});

const mapDispatchToProps = dispatch => ({
  onPingClick: () => {
    const ping = {"type": Ping};
    console.log("Dispatching ping message", ping);
    dispatch(ping)
  }
});

// const ping = () => { "type" : Ping};

export const Lobby = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyPure);
