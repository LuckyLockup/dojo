import {StyleSheet} from "react-native";

export const playerStyle = StyleSheet.create({
    container: {
        backgroundColor: "#8c8663",
        height: "20%",
    },
    closedHand: {
        flexDirection: 'row'
    },
    discard: {
        flexDirection: 'row'
    },
    openHand: {
        flexDirection: 'row'
    }
});

export const rightHandStyle: HandStyle = StyleSheet.create({
    container: {
        backgroundColor: "#243a8c",
        height: "20%",
    },
    closedHand: {
        flexDirection: 'row'
    },
    discard: {
        flexDirection: 'row'
    },
    openHand: {
        flexDirection: 'row'
    }
});

export const oppositeHandStyle: HandStyle = StyleSheet.create({
    container: {
        backgroundColor: "#458c68",
        height: "20%",
    },
    closedHand: {
        flexDirection: 'row'
    },
    discard: {
        flexDirection: 'row'
    },
    openHand: {
        flexDirection: 'row'
    }
});

export const leftHandStyle: HandStyle = StyleSheet.create({
    container: {
        backgroundColor: "#788bd3",
        height: "20%",
    },
    closedHand: {
        flexDirection: 'row'
    },
    discard: {
        flexDirection: 'row'
    },
    openHand: {
        flexDirection: 'row'
    }
});

export type HandStyle = typeof playerStyle;
export const styles = [playerStyle, rightHandStyle, oppositeHandStyle, leftHandStyle];
