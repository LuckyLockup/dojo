import React from "react";
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const LobbyPresentation = ({pingId, onPingClick}) => (
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
                onPress={() => {}}
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
            onPress={() => onPingClick(pingId)}
            title="New Game"
            color="#841584"
            style={{
              flex: 4,
            }}
        />
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


LobbyPresentation.propTypes = {
  pingId: PropTypes.number.isRequired,
  onPingClick: PropTypes.func.isRequired
};

const mapStateToProps = ({ping}) => ({
  pingId: ping,
});

const mapDispatchToProps = dispatch => ({
  onPingClick(pingId) {
    const ping = {"type": "Ping", "payload": {"id": pingId}};
    console.log("Dispatching ping message", ping);
    dispatch(ping)
  }
});

export const Lobby = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyPresentation);
