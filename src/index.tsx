import * as React from 'react'
import {Provider} from "react-redux"
import { AppRegistry } from "react-native"
import Home from "src/features/home/components/Home";
import {Lobby} from "src/features/lobby/components/Lobby"
import {Table} from "src/features/riichi/components/Table"
import Routing, {Router, Switch} from 'src/common/routing/index'
import {View} from 'react-native';
import {Header} from "src/common/Header"
import configureStore from 'src/Store'
import {init as wsInit} from "src/common/ws";
import {Action, Store} from "redux";
import {DojoState} from "./State";


const Route = Routing.Route;

const store: Store<DojoState, Action> = configureStore();
wsInit(store);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <View>
                        <Header/>
                        <View>
                            <Switch>
                                <Route path="/lobby" component={Lobby}/>
                                <Route path="/table/:tableId" component={Table}/>
                                <Route path="/" component={Home}/>
                            </Switch>
                        </View>
                    </View>
                </Router>
            </Provider>
        );
    }
}

// register the app
AppRegistry.registerComponent("root", () => App);
AppRegistry.runApplication('root', { rootTag: document.getElementById('root') });
