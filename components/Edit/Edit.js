// react native app
import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Input, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
const date = new Date();
class Edit extends Component {
  state = {
    Miles: "",
    Time: "",
    Date: "",
    currentRun: this.props.currentRun,
    runnerId: this.props.user
  }
  
  handleSubmit = (event) => {
    console.log(this.props);
    console.log(this.state.Miles);
    this.props.dispatch({ type: "EDIT_RUN", payload: this.state });
    this.props.navigation.navigate('Home');
  };
  // edit specific run then goes back to database
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello {this.props.user[0].user_name}! Edit Run {this.props.currentRun}
        </Text>
        <Input
   placeholder="Miles"
   style={styles}
   onChangeText={value => this.setState({ Miles: value })}
  />
          <Input
   placeholder="Time"
   style={styles}
   onChangeText={value => this.setState({ Time: value })}
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
  title="Edit Run"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>


      </View>
    );
  }
}

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
  currentRun: reduxStore.getCurrentRunID,
});

export default connect(putPropsOnReduxStore)(Edit);
