import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button,
  Alert
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Auth0 from "react-native-auth0";
import Home from "../Home/Home"
import Add from "../Add/Add"
import Edit from "../Edit/Edit"
import axios from 'axios'
import {connect} from 'react-redux';
var credentials = require("../Login/auth0-configuration"); // has info from my
const auth0 = new Auth0(credentials);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null, username: null };
  }

  
  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: "openid profile email"
      })
      .then(credentials => {
        Alert.alert("AccessToken: " + credentials.accessToken);
        this.setState({ accessToken: credentials.accessToken });
        // this.props.dispatch({ type: "SET_USERS", payload: credentials.accessToken });
        // get all the users on database, if rows>0 where username== user.nickname, nothing ELSE insert user

        auth0.auth
          .userInfo({ token: credentials.accessToken })
          .then(user => {
            Alert.alert("userName: " + user.nickname);
            this.setState({ username: user.nickname });
            this.props.dispatch({type:"CHECK_LOGIN", payload:user.nickname})
          })
          .catch(console.error);

      })
  };
  _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert("Logged out!");
        this.setState({ accessToken: null });
      })
      .catch(error => {
        console.log("Log out cancelled");
      });
  };
  render() {
    let loggedIn = this.state.accessToken === null ? false : true;
    if(loggedIn&&this.props.user){
      return(
            <View style={styles.container}>
        <Text style={styles.welcome}>
          Thanks for Logging In {this.state.username}😃
        </Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Go to Home Page"></Button>
        <Button
        onPress={this._onLogout}
        title="Log Out"
      />
      </View>)
    }
    else{
      return(
      <View style={styles.container}>
      <Text style={styles.header}> Run Logger - Login </Text>
      <Text>
        You are{loggedIn ? ` ${this.state.username} ` : " not "}logged in .{" "}
      </Text>
      <Text>
        {loggedIn
          ? `Thanks for being logged in you definetly don't need HAAAAAAAAALLLLLLLLP`
          : " You need HAAAAAAALLLLLLPPPPP"}{" "}
      </Text>
      <Button
        onPress={loggedIn ? this._onLogout : this._onLogin}
        title={loggedIn ? "Log Out" : "Log In"}
      />
    </View>
);

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
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
const putPropsOnReduxStore = (reduxStore) => ({
  user: reduxStore.getUserReducer,
});


const AppNavigator = createStackNavigator({
  Login: connect(putPropsOnReduxStore)(App),
  Home: connect(putPropsOnReduxStore)(Home),
  Add: connect(putPropsOnReduxStore)(Add),
  Edit: connect(putPropsOnReduxStore)(Edit)
})

const AppContainer = createAppContainer(AppNavigator);

export default connect()(AppContainer);
