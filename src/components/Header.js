import React from "react";
import {
  Text,
  View,
} from 'react-native';
import {Link} from "../utilities/routing/index";

export const Header = (
    <View style={{
      backgroundColor: '#6edfff',
    }}>
      <View style={{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <Link
            to="/home"
            style={{
              alignItems: 'center',
              padding: 10,
            }}>
          <Text>Home</Text>
        </Link>
        <Link
            to="/lobby"
            style={{
              flex: 8,
              alignItems: 'center',
              padding: 10,
            }}>
          <Text>Lobby</Text>
        </Link>
      </View>
    </View>
);
