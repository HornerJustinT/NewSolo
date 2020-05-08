// react native app
import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Input, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

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
    console.log(this.state.Date)
    this.props.dispatch({ type: "ADD_RUN", payload: this.state });
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Hello {this.props.user[0].user_name}! Add A Run!
            {this.props.currentRun}
          </Text>
          <Input
            placeholder="Number of Miles"
            style={styles}
            onChangeText={(value) => this.setState({ Miles: value })}
          />
          <Input
            placeholder="Time in Minutes"
            style={styles}
            onChangeText={(value) => this.setState({ Time: value })}
          />
      <DatePicker
        style={{width: 200}}
        date={this.state.Date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate="2199-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({Date: date})}}
      />
          <Button
            onPress={this.handleSubmit}
            title="Add Run"
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
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
const putPropsOnReduxStore = (reduxStore) => ({
  user: reduxStore.getUserReducer,
  runs: reduxStore.getRunHistory,
});

export default connect(putPropsOnReduxStore)(Add);
