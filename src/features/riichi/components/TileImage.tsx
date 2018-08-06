import * as React from 'react'
import {Image} from "react-native";

export const tileImage = (tile: string, key?: number) => <Image
    key={key}
    style={{width: 40, height: 50}}
    source={{uri: '/assets/riichi/' + tile + ".png"}}
/>;