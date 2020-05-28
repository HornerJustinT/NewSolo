import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, SimpleCard } from "@paraboly/react-native-card";
import { connect } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";
var Icon = require("react-evil-icons");
// get total time also

class Run extends React.Component {
  state = {
    pace: this.props.run.pace
  };
  componentDidMount() { // formating pace 
    console.log(this.state.pace[1]);
    this.setState({
      pace:this.props.run.pace
    })
    if (this.state.pace[1] == ":" && this.state.pace.length == 3) {
      this.setState({
        pace: "0" + this.state.pace.slice(0,2) + '0' + this.state.pace.slice(2)
      });
    }
    else if (this.state.pace[1]==":"){
      this.setState({
        pace: "0" + this.state.pace 
      });
    }

    else if( this.state.pace[2] == ":" && this.state.pace.length==4){
      this.setState({
        pace : (this.state.pace.slice(0,3)+'0'+ this.state.pace.slice(3))
      })
      console.log('add space');
      }
  }
  editRun = () => {
    this.props.dispatch({
      type: "EDIT_CURRENT_RUN",
      payload: this.props.run.id,
    });
    this.props.navigation.navigate("Edit");
  };
  render() {
    
    return (
      <View style={styles.container}>
        <Card
          title={`${this.props.run.length} Miles `}
          iconDisable
          onPress={this.editRun} // get to edit run page
          borderRadius={20}
          backgroundColor="red"
          topRightText={`${this.props.run.date}`}
          bottomRightText={`${this.props.run.pace} Mile Pace`}
          iconBackgroundColor="#fcd"
          textContainerNumberOfLines={null}
          backgroundColor="black"
          content={`${this.props.run.time} Minutes`}
          titleStyle={{
            fontSize: 35,
          }}
          topRightStyle={{
            fontSize: 20,
            fontWeight: "700",
          }}
          contentStyle={{
            fontSize: 20,
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
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const putPropsOnReduxStore = (reduxStore) => ({
  user: reduxStore.getUserReducer,
  runs: reduxStore.getRunHistory,
});

export default connect(putPropsOnReduxStore)(Run);
