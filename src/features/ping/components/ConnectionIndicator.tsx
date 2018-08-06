import * as React from 'react'
import * as Redux from 'redux'
import {DojoState} from "src/State";
import {connect} from "react-redux";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {createPing} from "../Actions";
import {AnyAction} from "redux";


const styles = StyleSheet.create({
    button: {
        flex: 4,
        backgroundColor: "#828470",
        justifyContent: "center",
    },
    text: {
        justifyContent: "center",
        alignContent: "center",
    },
});


interface Props {

}

interface State {
    id: number,
}

interface DispatchProps {
    onPingClick: (id: number) => () => void
}


function mapStateToProps(state: DojoState, props: Props): State {
    return {
        id: state.ping.id
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AnyAction>, props: Props): DispatchProps {
    return {
        onPingClick: (id: number) => () => {
            const ping = createPing(id);
            dispatch(ping)
        }
    }

}

const _component: React.SFC<Props & State & DispatchProps> = (props) => (
    <View style={styles.button}>
        <TouchableOpacity
            onPress={props.onPingClick(props.id)}
        >
            <Text style={styles.text}>{props.id} </Text>
        </TouchableOpacity>
    </View>

);

export default connect(mapStateToProps, mapDispatchToProps)(_component);