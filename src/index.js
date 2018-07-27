import React from 'react';
import {Provider} from "react-redux";
import ReactNative from 'react-native'
import store from "./utilities/storage/store";
import TopLevelComponent from './screens/EntryScreen';
import {Home} from "./components/Home";
import {Lobby} from "./components/Lobby";
import {Table} from "./components/Table";
import Routing, {Router} from './utilities/routing/index';
import {View} from 'react-native';


const Route = Routing.Route;


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <View>
                    <Route path='/' component={TopLevelComponent}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/lobby" component={Lobby}/>
                    <Route path="/table" component={Table}/>
                  </View>
                </Router>
            </Provider>
        );
    }
}

ReactNative.render(<App/>, document.getElementById('root'));