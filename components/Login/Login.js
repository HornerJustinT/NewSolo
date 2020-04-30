// react native app
import React, { Component } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Auth0 from "react-native-auth0";
// import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';
var credentials = require("./auth0-configuration"); // has info from my
const auth0 = new Auth0(credentials);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null, username: null };
  } // after this I need to use Get user info api to get user name

  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: "openid profile email"
      })
      .then(credentials => {
        Alert.alert("AccessToken: " + credentials.accessToken);
        this.setState({ accessToken: credentials.accessToken });
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
    return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default Login;
