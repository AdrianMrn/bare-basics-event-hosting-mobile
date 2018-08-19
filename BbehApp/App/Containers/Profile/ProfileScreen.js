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
import { } from '../../Services/Api';

import styles from './Styles/ProfileStyles';

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      description: '',
      // other infos, social links, IMAGE, ...

      loading: false,
    }
  }

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    })
  }

  render() {
    const state = this.state;
    return (
      <Container style={styles.authScreen}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>My Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Profile</Text>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
