// react native app
import React, { Component } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from 'react-navigation-stack'
export default class HomeScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      )
    }
  }