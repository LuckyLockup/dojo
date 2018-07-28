import React from 'react';
import {Provider} from "react-redux";
import ReactNative from 'react-native'
import store from "./utilities/storage/store";
import {Home} from "./components/Home";
import {Lobby} from "./components/Lobby";
import {Table} from "./components/Table";
import Routing, {Router, Switch} from './utilities/routing/index';
import {View} from 'react-native';
import {Header} from "./components/Header";


const Route = Routing.Route;


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <View>
                    {Header}
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

ReactNative.render(<App/>, document.getElementById('root'));