import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text } from 'native-base';

import Store from '../../Services/Store';

/* import styles from './Styles/ProfileStyles'; */

class ProfileScreen extends React.Component {
  render() {
    const user = this.props.store.get('selectedUser');
    // TODO: get user details from API
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate(this.props.navigation.getParam('navBack', 'GeneralInfo'))}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>User Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>{user.speakerName}</Text>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
