import React from "react";
import {
  Text,
  View,
  Button,
} from 'react-native'
import PropTypes from 'prop-types';
import {createTable, joinTable} from "../actions/ActionCreators";
import {connect} from "react-redux";
import {Link} from "../utilities/routing/index";


const randomTableId = guid();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const HomePure = ({tableId, userId, onCreateTable}) => (
    <View style={{
      display: "flex",
    }}>
      <Text>
        Home
      </Text>
      <Link to={"/table/"} >
        <Button
            onPress={() => onCreateTable(tableId, userId)}
            title={"Create table " + tableId}
            color="#841584"
        />
      </Link>
    </View>

);

HomePure.propTypes = {
  userId: PropTypes.number.isRequired,
  tableId: PropTypes.string,
  onCreateTable: PropTypes.func.isRequired,
};

const mapStateToProps = ({table, user}) => ({
  userId: user.userId,
  // tableId: tableReducer.tableId,
  tableId: randomTableId,
});

const mapDispatchToProps = dispatch => ({
  onCreateTable: (tableId, userId) => {
    dispatch(createTable(tableId, userId));
  }
});


export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePure);