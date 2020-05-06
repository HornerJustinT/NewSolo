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
      if(this.props.runs[0]){
        return (
          <ScrollView style={styles.container}>
                {this.props.runs.map( run =>
                    <Run key={run.id} run={run} navigation={this.props.navigation} />
                    )}
            <Button onPress={() => this.props.navigation.navigate('Add')}  title = "Add Run" color = 'green'/>
            <Text>{this.props.user[0].user_name} Your first run is {this.props.runs[0].length} Miles</Text><Button onPress={() => this.props.navigation.navigate('Edit')}  title = "Edit Run" color = 'green'/>
          </ScrollView>
        )
      }
      else{
        return(
          <View style={styles.container}>
            </View>
        )
      }

    }
  }
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#F5FCFF',
  //   },
  //   welcome: {
  //     fontSize: 20,
  //     textAlign: 'center',
  //     margin: 10,
  //   },
  //   instructions: {
  //     textAlign: 'center',
  //     color: '#333333',
  //     marginBottom: 5,
  //   },

    
  // });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: "center",
      backgroundColor: "#fff"
      // justifyContent: "center"
    }
  });
  
  const putPropsOnReduxStore = (reduxStore) => ({
    user: reduxStore.getUserReducer,
    runs: reduxStore.getRunHistory
  });


  export default connect(putPropsOnReduxStore)(HomeScreen);