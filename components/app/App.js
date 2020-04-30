// // App.js
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { createStackNavigator, createAppContainer } from "react-navigation";

// import Home from '../Home/Home';
// import Login from '../Login/Login';


// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home
//   },
//   Login: {
//     screen: Login
//   }
// });

// const AppContainer = createAppContainer(AppNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

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
var credentials = require("../Login/auth0-configuration"); // has info from my
const auth0 = new Auth0(credentials);
var request = require("request");


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
        var options = {
          method: 'GET',
          url: 'https://dev-e8l8uqk7.auth0.com/api/v2/users',
          qs: {q: 'email:"jane@exampleco.com"', search_engine: 'v3'},
          headers: {authorization: `Bearer ${credentials.accessToken}`}
        };
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
        });
        // Parse the URL and extract the Access Token
        auth0.auth
          .userInfo({ token: credentials.accessToken })
          .then(user => {
            Alert.alert("userName: " + user.nickname);
            this.setState({ username: user.nickname });
          })
          .catch(console.error);
      })
      .catch(error => console.log(error));
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
    if(loggedIn){
      return(
            <View style={styles.container}>
        <Text style={styles.welcome}>
          Thanks for Logging In 😃
        </Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Go to Home Page"></Button>
      </View>)
    }
    else{
      return(
            // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     This is App component!
      //   </Text>
      //   <Button onPress={() => this.props.navigation.navigate('test')} title="Go to Test"></Button>
      // </View>
      <View style={styles.container}>
      <Text style={styles.header}> Spike Attempt - Login </Text>
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

class Test extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is Test component!
        </Text>
        <Button onPress={() => this.props.navigation.navigate('home')} title="Go to App"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const AppNavigator = createStackNavigator({
  Login: App,
  Home: Home
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
