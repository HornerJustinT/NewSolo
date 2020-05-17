import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, SimpleCard } from "@paraboly/react-native-card";
import {connect} from 'react-redux';
import { Colors } from "react-native/Libraries/NewAppScreen";
var Icon = require('react-evil-icons');
// get total time also

class Run extends React.Component {
  editRun = ()=>{
    this.props.dispatch({ type: 'EDIT_CURRENT_RUN', payload: this.props.run.id});
    this.props.navigation.navigate('Edit');
  }
  render() {
    return (
      <View style={styles.container}>
        <Card
          
          title= {`Run ${this.props.run.id}`}
          iconDisable
          onPress= {this.editRun} // get to edit run page 
          borderRadius={20}
          backgroundColor= 'red'
          topRightText= {this.props.run.date}
          bottomRightText={`${this.props.run.pace}:00 Minute Pace`}
          iconBackgroundColor="#fcd"
          textContainerNumberOfLines={null}
          backgroundColor = 'black'
          content={`${this.props.run.length} Miles`}
          titleStyle={{
              fontSize:50
          }}
          topRightStyle={{
            fontSize: 20,
            fontWeight: "700",
          }}
          contentStyle={{
              fontSize:20,
              fontWeight: "700",
          }}
          bottomRightStyle={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

const putPropsOnReduxStore = (reduxStore) => ({
    user: reduxStore.getUserReducer,
    runs: reduxStore.getRunHistory
  });


  export default connect(putPropsOnReduxStore)(Run);