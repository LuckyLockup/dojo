import React from 'react';
import {connect} from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {Link} from "../utilities/routing/index";


class EntryScreen extends React.Component {

    render() {

        return (
            <View  style={{
              // display: "flex",
              // flexDirection: 'column',
              // flexGrow: 1,
              // flexShrink: 1,
              // flexBasis: 0,
              // height: "100%",
              backgroundColor: '#6edfff',
            }}>
              <View style={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
                <Link
                    to="/"
                    style={{
                      alignItems: 'center',
                      padding: 10,
                    }}>
                  <Text>Home</Text>
                </Link>
                <Link
                    to="/lobby"
                    style={{
                      flex: 8,
                      alignItems: 'center',
                      padding: 10,
                    }}>
                  <Text>Lobby</Text>
                </Link>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

function mapStateToProps(state) {
    return ({
            sampleReducer: state.sampleReducer
        }

    )
}

export default connect(mapStateToProps)(EntryScreen);

