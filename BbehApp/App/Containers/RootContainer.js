import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

// Styles
import styles from './Styles/RootContainerStyles'

import AuthLoadingScreen from './Auth/AuthLoadingScreen';
import SignInScreen from './Auth/SignInScreen';
import LogOutScreen from './Auth/LogOutScreen';
import RegisterScreen from './Auth/RegisterScreen';
import EventOverview from './App/EventOverview';
import ProfileScreen from './Profile/ProfileScreen';

import SideBar from "./SideBar/SideBar.js";

export default class RootContainer extends Component {
  AuthStack = createStackNavigator({
    SignIn: { screen: SignInScreen, navigationOptions: { header: null } },
    Register: { screen: RegisterScreen, navigationOptions: { header: null } },
  });

  AppStack = createDrawerNavigator({
    Home: EventOverview,
    /*Other: OtherScreen */
    Profile: ProfileScreen,
    LogOut: LogOutScreen
  }, {
      contentComponent: props => <SideBar {...props} />
    });

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
