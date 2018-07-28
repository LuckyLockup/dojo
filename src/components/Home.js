import React from "react";
import {
  Text,
  View,
  Button,
} from 'react-native'
import PropTypes from 'prop-types';
import {createTable, joinTable} from "../actions/ActionCreators";
import {connect} from "react-redux";
import { withRouter } from 'react-router'



const randomTableId = guid();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const HomePure = ({tableId, userId, onCreateTable, history}) => (
    <View style={{
      display: "flex",
    }}>
      <Text>
        Home
      </Text>
        <Button
            onPress={() => onCreateTable(tableId, userId, history)}
            title={"Create table " + tableId}
            color="#841584"
        />
    </View>

);

HomePure.propTypes = {
  userId: PropTypes.number.isRequired,
  tableId: PropTypes.string,
  onCreateTable: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({table, user}) => ({
  userId: user.userId,
  // tableId: tableReducer.tableId,
  tableId: randomTableId,
});

const mapDispatchToProps = dispatch => ({
  onCreateTable: (tableId, userId, history) => {
    history.push("/table/" + tableId);
    dispatch(createTable(tableId, userId));
  }
});


export const Home = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePure));