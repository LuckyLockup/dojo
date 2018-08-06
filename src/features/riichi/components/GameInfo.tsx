import * as React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: "60px",
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
    },
    gameEnded: {
        height: "40px",
        backgroundColor: "#26550d",
    }
});

export interface GameInfoProps {
    gameId?: number,
    turn?: number,
    uraDoras: Array<string>,
    gameEnded?: string,
}

export class GameInfo extends React.PureComponent<GameInfoProps> {
    uraDoras() {
        return <View style={styles.info}>
            <Text>Ura Doras: </Text>
            {this.props.uraDoras.map((tile, index) =>
                <Image
                    key={index}
                    style={{width: 40, height: 50}}
                    source={{uri: '/assets/riichi/' + tile + ".png"}}
                />
            )}
        </View>
    }

    render() {
        if (this.props.gameId && this.props.turn) {
            if (this.props.gameEnded) {
                return <View style={styles.container}>
                    <Text>{this.props.gameEnded}</Text>
                    {this.uraDoras()}
                </View>
            }
            return <View style={styles.container}>
                <Text style={styles.info}>{"GameId: " + this.props.gameId}</Text>
                <Text style={styles.info}>{"Turn: " + this.props.turn}</Text>
                {this.uraDoras()}
            </View>
        }
        return <Text>Game is not started...</Text>
    }
}