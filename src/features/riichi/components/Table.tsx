import * as React from 'react'
import * as Redux from "redux";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {connect} from 'react-redux';
import {discardTile, getState, joinTable, startGame} from "src/features/riichi/ActionCreators";
import {RouteComponentProps} from 'react-router'
import {playerStyle, styles as handStyles} from "./HandStyles"
import {DojoState} from "src/State";
import {isGameStarted, TableState} from "../riichi";
import {AnyAction} from "redux";
import {PlayerState} from "./PlayerState";
import {OpponentHand} from "./OpponentHand";
import {GameInfo} from "./GameInfo";
import {ClaimingAction} from "../Actions";
import {PossibleAction} from "./PossibleAction";


export const styles = StyleSheet.create({
    controls: {
        flexDirection: "row"
    },
    button: {
        flex: 1,
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
    table?: TableState,
    gameEnded?: string,
    commands: Array<ClaimingAction>,
}

interface DispatchProps {
    getState: (tableId: string) => void;
    joinTable: (tableId: string) => void;
    startGame: (tableId: string) => void;
    discardTile: (tableId: string, gameId: number, turn: number) => (tile: string) => void;
    claimCommand: (action: ClaimingAction) => void
}

class _Table extends React.PureComponent<Props & State & DispatchProps> {
    private opponentHand(index: number) {
        if (isGameStarted(this.props.table) && this.props.table.states[index]) {
            return <OpponentHand
                style={handStyles[index]!}
                {...this.props.table.states[index]}/>
        }
        return <Text>Right Player</Text>;
    }

    private playerHand() {
        if (isGameStarted(this.props.table) && this.props.table.states[0]) {
            const onDiscard = this.props.discardTile(this.props.tableId, this.props.table.gameId,
                this.props.table.turn);
            return <PlayerState
                discardTile={onDiscard}
                style={playerStyle}
                {... this.props.table.states[0]}/>
        }
        return <Text>Game is not started</Text>;
    }

    private gameInfo() {
        if (isGameStarted(this.props.table)) {
            const gameProps = {
                gameId: this.props.table.gameId,
                turn:  this.props.table.turn,
                uraDoras: this.props.table.uraDoras,
                gameEnded: this.props.gameEnded,
            };
            return <GameInfo {...gameProps}/>
        }
        return <Text>Game is not started...</Text>

    }

    componentDidMount() {
        console.log("current table: ", this.props.table);
        if (!this.props.table) {
            this.props.getState(this.props.tableId)
        }
    }

    render() {
        return <View>
            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={() => this.props.joinTable(this.props.tableId)}
                    style={styles.button}>
                    <Text>Join table</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.startGame(this.props.tableId)}
                    style={styles.button}>
                    <Text>Start game</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.getState(this.props.tableId)}
                    style={styles.button}
                ><Text>Get state</Text></TouchableOpacity>
            </View>
            {this.gameInfo()}
            {this.playerHand()}
            <PossibleAction
                commands={this.props.commands}
                onclick={this.props.claimCommand}
            />
            {this.opponentHand(1)}
            {this.opponentHand(2)}
            {this.opponentHand(3)}
            <Text>Footer below table</Text>
        </View>;
    }
}

function mapStateToProps(state: DojoState, props: Props): State {
    const tableId: string = props.location.pathname.split("/").pop()!;
    const table = tableId && state.riichi.byId[tableId] ?  state.riichi.byId[tableId].table : undefined;
    const commands = tableId && state.riichi.byId[tableId] && state.riichi.byId[tableId].commands ? state.riichi.byId[tableId].commands : [];
    const gameEnded = tableId && state.riichi.byId[tableId] && state.riichi.byId[tableId].gameEnded ?
        state.riichi.byId[tableId].gameEnded : undefined;
    return {
        userId: state.user.userId,
        tableId: tableId,
        table: table,
        commands: commands,
        gameEnded: gameEnded,
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AnyAction>, props: Props): DispatchProps {
    return {
        getState: (tableId) => dispatch(getState(tableId)),
        joinTable: (tableId) => {
            if (tableId) {
                dispatch(joinTable(tableId));
            }
        },
        startGame: (tableId) => dispatch(startGame(tableId)),
        discardTile: (tableId, gameId, turn) => (tile) => {
            dispatch(discardTile(tableId, gameId, turn, tile))
        },
        claimCommand: (action: ClaimingAction) => dispatch(action)
    }
}

export const Table = connect(mapStateToProps, mapDispatchToProps)(_Table);
