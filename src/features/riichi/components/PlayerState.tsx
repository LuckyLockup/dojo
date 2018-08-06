import * as React from 'react'
import {PlayerState as PlayerStateProps} from "src/features/riichi/riichi"
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import {HandStyle} from "./HandStyles";
import {tileImage} from "./TileImage";
import {DeclaredSet} from "./DeclaredSet";



export class PlayerState extends React.Component<PlayerStateProps
    & { discardTile: (t: string) => void }
    & { style: HandStyle}> {

    renderCurrentTile() {
        const currentTile = this.props.payload.currentTile;
        if (currentTile) {
            return <TouchableOpacity onPress={() => this.props.discardTile(currentTile)}>
                {tileImage(currentTile, 14)}
            </TouchableOpacity>;
        }
        return <View/>

    }

    render() {
        return <View style={this.props.style.container}>
            <Text>{"Position:" + this.props.payload.player.payload.position}</Text>
            <View style={this.props.style.openHand}>
                <Text>Closed hand: </Text>
                {this.props.payload.closedHand.map((tile, index) =>
                    <TouchableOpacity key={index} onPress={() => this.props.discardTile(tile)}>
                        {tileImage(tile, index)}
                    </TouchableOpacity>
                )}
                <Text> </Text>
                {this.renderCurrentTile()}
            </View>
            <View style={this.props.style.discard}>
                <Text>Discard: </Text>
                {this.props.payload.discard.map((t, i) => tileImage(t, i))}
            </View>
            <View style={this.props.style.openHand}>
                <Text>OpenHand: </Text>
                {this.props.payload.openHand.map((set, i) => <DeclaredSet
                    current={this.props.payload.player.payload.position}
                    set={set}
                    key={i}/>)}
            </View>
        </View>
    }
};