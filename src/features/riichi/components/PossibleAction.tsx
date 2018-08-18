import * as React from 'react'
import {
    Text,
    View,
    StyleSheet, TouchableOpacity,
} from 'react-native'
import * as A from "../Actions";
import {tileImage} from "./TileImage";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: "60px",
    },
    command: {
        flex: 1
    },
    winCommand: {
        flex: 2,
        backgroundColor: "#7abf2f"
    }
});


export class PossibleAction
    extends React.PureComponent<{ commands: Array<A.ClaimingAction>, onclick: (cmd: A.ClaimingAction) => void }> {
    style(action: A.ClaimingAction) {
        switch (action.type) {
            case A.DeclareRon:
            case A.DeclareTsumo:
                return styles.winCommand;
            default:
                return styles.command;
        }
    }

    renderCommand(action: A.ClaimingAction) {
        switch (action.type) {
            case A.DeclareRon:
            case A.DeclareTsumo:
                return <Text>{action.type}</Text>;
            case A.ClaimChow:
                return <View style={{flexDirection: 'column'}}>
                    <Text>{action.type}</Text>
                    <View style={{flexDirection: 'row', height: "50px"}}>
                        {[action.payload.tile, ...action.payload.tiles]
                            .map((tile, key) => tileImage(tile, key))}
                    </View>
                </View>;
            case A.ClaimPung:
                return <View>
                    <Text>{action.type}</Text>
                </View>;
            default:
                return <Text>Unknown command</Text>;
        }
    }

    render() {
        if (this.props.commands.length > 0) {
            return <View style={styles.container}>
                <Text>Actions: </Text>
                {this.props.commands.map((command, index) => {
                    return <TouchableOpacity
                        key={index}
                        onPress={() => this.props.onclick(command)}
                        style={this.style(command)}>
                        {this.renderCommand(command)}
                    </TouchableOpacity>

                })}
            </View>
        }
        return <View style={styles.container}/>
    }
}