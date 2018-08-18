import * as React from 'react'
import {
    View,
    StyleSheet,
    Image
} from 'react-native'
import * as position from "src/features/riichi/positions";
import {WsDeclaredSet} from "../riichi";
import {tileImage} from "./TileImage";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    horizontalImage: {
        width: 40,
        height: 60,
        transform: [{ rotate: '90deg'}]
    }
});

export class DeclaredSet extends React.Component<{
    current: position.Position,
    set: WsDeclaredSet
}> {
    horizontalTile(tile: string, key?: number) {
        return <Image
            key={key}
            style={styles.horizontalImage}
            source={{uri: '/assets/riichi/' + tile + ".png"}}
        />;
    }

    render() {
        if (position.next(this.props.current) === this.props.set.payload.from) {
            return <View style={styles.container} >
                {this.props.set.payload.tiles.map((t, i) => tileImage(t, i))}
                {this.horizontalTile(this.props.set.payload.claimedTile, 3)}
            </View>
        } else if (position.next(position.next(this.props.current)) === this.props.set.payload.from) {
            return <View style={styles.container}>
                {tileImage(this.props.set.payload.tiles[0]!, 0)}
                {this.horizontalTile(this.props.set.payload.claimedTile, 1)}
                {tileImage(this.props.set.payload.tiles[1]!, 2)}
            </View>
        }
        return <View style={styles.container}>
            {this.horizontalTile(this.props.set.payload.claimedTile, 0)}
            {tileImage(this.props.set.payload.tiles[0]!, 1)}
            {tileImage(this.props.set.payload.tiles[1]!, 2)}
        </View>
    }
};