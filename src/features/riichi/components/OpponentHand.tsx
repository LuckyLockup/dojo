import * as React from 'react'
import {PlayerState as PlayerStateProps} from "src/features/riichi/riichi"
import {
    Text,
    View,
} from 'react-native'
import {HandStyle} from "./HandStyles";
import {tileImage} from "./TileImage";
import {DeclaredSet} from "./DeclaredSet";


export class OpponentHand extends React.PureComponent<PlayerStateProps & {style: HandStyle}> {

    renderCurrentTile() {
        if (this.props.payload.currentTile) {
            return tileImage(this.props.payload.currentTile, 14)
        }
        return <View/>
    }

    render() {
        return <View style={this.props.style.container}>
            <Text>{"Position:" + this.props.payload.player.payload.position}</Text>
            <View style={this.props.style.openHand}>
                <Text>Closed hand: </Text>
                {this.props.payload.closedHand.map((t, i) => tileImage(t, i))}
                <Text>   </Text>
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