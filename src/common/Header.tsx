import * as React from 'react'
import {StyleSheet, Text, View,} from 'react-native';
import {Link} from "./routing/index";

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "#34aabf",
    },
    home: {
        alignItems: 'center',
        padding: 10,
    },
    lobby: {
        flex: 8,
        alignItems: 'center',
        padding: 10,
    }
});

export const Header: React.SFC<{}> = () => (
    <View style={styles.header}>
        <View style={styles.home}>
            <Link to="/home">
                <Text>Home</Text>
            </Link>
        </View>
        <View  style={styles.lobby}>
            <Link to="/lobby">
                <Text>Lobby</Text>
            </Link>
        </View>
    </View>
);
