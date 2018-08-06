import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import {connect} from "react-redux";
import {RouteComponentProps} from 'react-router'
import * as Redux from "redux";
import {DojoState} from "src/State";
import {createTable} from "src/features/riichi/Service";
import {createTableAction} from "../../riichi/ActionCreators";
import {AnyAction} from "redux";

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#841584",
        height: "30px",
        alignItems: 'center',
        justifyContent: "center",
    },
});


interface Props extends RouteComponentProps<any> {

}

interface State {
    userId: number,
    tableId: string,
}

interface DispatchProps {
    onCreateTable: (tableId: string, userId: number) => () => void
}


function mapStateToProps(state: DojoState, props: Props): State {
    return {
        userId: state.user.userId,
        tableId: randomTableId,
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AnyAction>, props: Props): DispatchProps {
    return {
        onCreateTable: (tableId: string, userId: number) => () => {
            const action = createTableAction(tableId, userId);
            dispatch(action);
            //show loading indicator
            console.log(props.history);
            createTable(action).then(res =>  props.history.push("/table/" + tableId))
        }
    }

}

const randomTableId = guid();

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const _home: React.SFC<Props & State & DispatchProps> = (props) => (
    <View style={{
        display: "flex",
    }}>
        <Text>
            Home
        </Text>
        <TouchableOpacity
            onPress={props.onCreateTable(props.tableId, props.userId)}
            style = {styles.button}
        ><Text>{"Create table " + props.tableId}</Text></TouchableOpacity>
    </View>

);


export default connect(mapStateToProps, mapDispatchToProps)(_home);
// export default  withRouter(({ history }) => __home) ;