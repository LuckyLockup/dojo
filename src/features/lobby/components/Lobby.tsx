import * as React from 'react'
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PingButtom from 'src/features/ping/components/ConnectionIndicator'

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
    },
    footer: {
        display: "flex",
        backgroundColor: "#848441",
        flexDirection: 'row',
        flexShrink: 0,
        height: "30px"
    }
});

export const Lobby: React.SFC<{}> = () => (
    <View style={styles.scrollViewContainer}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}
            scrollEventThrottle={16} // ~60 events per second
            style={styles.scrollViewStyle}
        >
            {[1,2,3,4,5,6,7,8].map((item, i) => (
                <TouchableHighlight
                    key={i}
                    onPress={() => {console.log("Clicking on game")}}
                    style={styles.box}
                >
                    <Text>{i}</Text>
                </TouchableHighlight>
            ))}
        </ScrollView>
        <View style={styles.footer}>
            <Text>Footer</Text>
            <PingButtom/>
        </View>
    </View>
);
