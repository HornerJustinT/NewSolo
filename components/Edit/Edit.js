// react native app
import React, { Component } from "react";
import {connect} from 'react-redux';
import { Alert, Button, StyleSheet, Text, View } from "react-native";

class Edit extends Component {
  // edit specific run then goes back to database
    render() {
      return (
        <View style={styles.container}>
          <Text>{this.props.user[0].user_name} Edit this run Miles</Text>
        </View>
      )
    }
  }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//       fontSize: 20,
//       textAlign: 'center',
//       margin: 10,
//     },
//     instructions: {
//       textAlign: 'center',
//       color: '#333333',
//       marginBottom: 5,
//     },

    
//   });
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
      justifyContent: "center"
    }
  });
  const putPropsOnReduxStore = (reduxStore) => ({
    user: reduxStore.getUserReducer,
    runs: reduxStore.getRunHistory
  });


  export default connect(putPropsOnReduxStore)(Edit);