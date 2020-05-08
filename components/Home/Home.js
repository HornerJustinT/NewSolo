// react native app
import React, { Component } from "react";
import { Alert, Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { createStackNavigator } from 'react-navigation-stack'
import {connect} from 'react-redux';
import Run from '../Run/Run'
class HomeScreen extends Component {
  // home screen needs all the runs history
  componentDidMount(){
    this.props.dispatch({ type: 'GET_USER_RUNS', payload: this.props.user[0].id})
  }
    render() {
      console.log(this.props.runs[0]);
      if(this.props.runs[0]&& this.props.user[0].id){
        return (
          <ScrollView style={styles.container}>
                {this.props.runs.map( run =>
                    <Run key={run.id} run={run} navigation={this.props.navigation} />
                    )}
            <Button onPress={() => this.props.navigation.navigate('Add')}  title = "Add Run" color = 'green'/>
          </ScrollView>
        )
      }
      else{
        return(
          <View style={otherStyles.container}>
            <Text style = {otherStyles.titleText}>You Have No Runs! Shouldn't you go Running?</Text>
                        <Button onPress={() => this.props.navigation.navigate('Add')}  title = "Add Run" color = 'green'/>
            </View>
        )
      }

    }
  }
  const otherStyles = StyleSheet.create({
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: "center",
      backgroundColor: "#fff",
      // justifyContent: "center"
    }
  });
  
  const putPropsOnReduxStore = (reduxStore) => ({
    user: reduxStore.getUserReducer,
    runs: reduxStore.getRunHistory
  });


  export default connect(putPropsOnReduxStore)(HomeScreen);