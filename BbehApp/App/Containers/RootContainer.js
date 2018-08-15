import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

// Styles
import styles from './Styles/RootContainerStyles'

import AuthLoadingScreen from './Auth/AuthLoadingScreen';
import SignInScreen from './Auth/SignInScreen';
import HomeScreen from './App/HomeScreen';


export default class RootContainer extends Component {
  componentDidMount() {
  }


  AuthStack = createStackNavigator({
    SignIn: { screen: SignInScreen, navigationOptions: { title: 'Log in' } },
    //Register: { screen: RegisterScreen, navigationOptions: { title: 'Register' } },
  });
  AppStack = createDrawerNavigator({ Home: HomeScreen/* , Other: OtherScreen */ });

  SwitchNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: this.AppStack,
      Auth: this.AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );


  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <this.SwitchNavigator />
      </View>
    )
  }
}
