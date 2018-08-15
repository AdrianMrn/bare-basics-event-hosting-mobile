import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

import Store from '../../Services/Store';

import styles from '../Styles/RootContainerStyles'

class SignInScreen extends React.Component {
  componentDidMount = () => {
  }

  onInputChange = (field, text) => {
    let user = this.props.store.get('user');
    user = { ...user, [field]: text }
    this.props.store.set('user')(user);
  }

  render() {
    const user = this.props.store.get('user');
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
                focus
                onChangeText={text => { this.onInputChange('email', text) }}
                value={user.email}
                placeholder="Email"
              />
            </Item>
            <Item last>
              <Input
                onChangeText={text => { this.onInputChange('password', text) }}
                value={user.password}
                placeholder="Password"
              />
            </Item>
            <Button block>
              <Text>Sign in</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

export default Store.withStore(SignInScreen);
