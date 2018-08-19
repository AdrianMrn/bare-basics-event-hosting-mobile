import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';

import styles from '../Styles/RootContainerStyles'

export default class LogOutScreen extends React.Component {
  constructor(props) {
    super(props);
    this._signOutAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
