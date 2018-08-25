import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

// Styles
import styles from './Styles/RootContainerStyles'

import AuthLoadingScreen from './Auth/AuthLoadingScreen';
import SignInScreen from './Auth/SignInScreen';
import LogOutScreen from './Auth/LogOutScreen';
import RegisterScreen from './Auth/RegisterScreen';
import EventOverview from './EventOverview';
import ExploreEvents from './Explore/ExploreEvents';
import ProfileScreen from './Profile/ProfileScreen';
// event components
import GeneralInfo from './Event/GeneralInfo';
import Attendees from './Event/Attendees';
import Schedule from './Event/Schedule';
import Speakers from './Event/Speakers';
import Sponsors from './Event/Sponsors';
import SponsorProfile from './Event/SponsorProfile';
import UserProfile from './Event/UserProfile';
import SessionDetail from './Event/SessionDetail';

import SideBar from "./SideBar/SideBar.js";

export default class RootContainer extends Component {
  AuthStack = createStackNavigator({
    SignIn: { screen: SignInScreen, navigationOptions: { header: null } },
    Register: { screen: RegisterScreen, navigationOptions: { header: null } },
  });

  AppStack = createDrawerNavigator({
    EventOverview,
    ExploreEvents,

    GeneralInfo,
    Attendees,
    Schedule,
    Speakers,
    Sponsors,
    SessionDetail,
    SponsorProfile,
    UserProfile,

    MyProfile: ProfileScreen,
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
