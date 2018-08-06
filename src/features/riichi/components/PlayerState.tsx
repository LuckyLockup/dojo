import * as React from 'react'
import {PlayerState as PlayerStateProps} from "src/features/riichi/riichi"
import {
    Text,
    View,
    Image, TouchableOpacity
} from 'react-native'
import {HandStyle} from "./HandStyles";



export class PlayerState extends React.Component<PlayerStateProps
    & { discardTile: (t: string) => void }
    & { style: HandStyle}> {
    renderImage(tile: string, index: number) {
        return <Image
            key={index}
            style={{width: 40, height: 50}}
            source={{uri: '/assets/riichi/' + tile + ".png"}}
        />;
    }

    renderCurrentTile() {
        const currentTile = this.props.payload.currentTile;
        if (currentTile) {
            return <TouchableOpacity onPress={() => this.props.discardTile(currentTile)}>
                {this.renderImage(currentTile, 14)}
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
                        {this.renderImage(tile, index)}
                    </TouchableOpacity>
                )}
                <Text> </Text>
                {this.renderCurrentTile()}
            </View>
            <View style={this.props.style.discard}>
                <Text>Discard: </Text>
                {this.props.payload.discard.map((t, i) => this.renderImage(t, i))}
            </View>
        </View>
    }
};