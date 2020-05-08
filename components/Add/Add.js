// react native app
import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Input, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


class Add extends Component {
  state = {
    Miles: "",
    Time: "",
    Date: "",
    runnerId: this.props.user[0].id,
  };
  // add run screen
  // adds run to database then goes back to home
  handleSubmit = (event) => {
    console.log(this.state.Miles);
    this.props.dispatch({ type: "ADD_RUN", payload: this.state });
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
        <View style={styles.container}>
          <Text>
            {this.props.user[0].user_name} Edit this run Miles
            {this.props.currentRun}
          </Text>
          <Input
            placeholder="Miles"
            style={styles}
            onChangeText={(value) => this.setState({ Miles: value })}
          />
          <Input
            placeholder="Time"
            style={styles}
            onChangeText={(value) => this.setState({ Time: value })}
          />
          <Input
            placeholder="Date"
            style={styles}
            onChangeText={(value) => this.setState({ Date: value })}
          />
          <Button
            onPress={this.handleSubmit}
            title="Edit Run"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
      </View>
    );
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
    justifyContent: "center",
  },
});
const putPropsOnReduxStore = (reduxStore) => ({
  user: reduxStore.getUserReducer,
  runs: reduxStore.getRunHistory,
});

export default connect(putPropsOnReduxStore)(Add);
