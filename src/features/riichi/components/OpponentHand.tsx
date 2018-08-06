import * as React from 'react'
import {PlayerState as PlayerStateProps} from "src/features/riichi/riichi"
import {
    Text,
    View,
    Image,
} from 'react-native'
import {HandStyle} from "./HandStyles";


export class OpponentHand extends React.PureComponent<PlayerStateProps & {style: HandStyle}> {
    renderImage(tile: string, index: number) {
        return <Image
            key={index}
            style={{width: 40, height: 50}}
            source={{uri: '/assets/riichi/' + tile + ".png"}}
        />;
    }

    renderCurrentTile() {
        if (this.props.payload.currentTile) {
            return this.renderImage(this.props.payload.currentTile, 14)
        }
        return <View/>
    }

    render() {
        return <View style={this.props.style.container}>
            <Text>{"Position:" + this.props.payload.player.payload.position}</Text>
            <View style={this.props.style.openHand}>
                <Text>Closed hand: </Text>
                {this.props.payload.closedHand.map((t, i) => this.renderImage(t, i))}
                <Text>   </Text>
                {this.renderCurrentTile()}
            </View>
            <View style={this.props.style.discard}>
                <Text>Discard: </Text>
                {this.props.payload.discard.map((t, i) => this.renderImage(t, i))}
            </View>
        </View>
    }
};