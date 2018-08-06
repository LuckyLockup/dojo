import * as React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row'
   },
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
    }
});

export interface GameInfoProps {
    gameId?: number,
    turn?: number,
    uraDoras: Array<string>
}

export class GameInfo extends React.PureComponent<GameInfoProps> {
    render() {
        if (this.props.gameId && this.props.turn) {
            return <View style={styles.container}>
                <Text style={styles.info}>{"GameId: " + this.props.gameId}</Text>
                <Text style={styles.info}>{"Turn: " + this.props.turn}</Text>
                <View style={styles.info}>
                    <Text>Ura Doras: </Text>
                    {this.props.uraDoras.map((tile, index) =>
                        <Image
                            key={index}
                            style={{width: 40, height: 50}}
                            source={{uri: '/assets/riichi/' + tile + ".png"}}
                        />
                    )}
                </View>
            </View>
        }
        return <Text>Game is not started...</Text>
    }
}