import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

import Store from '../../Services/Store';

import styles from './Styles/AuthStyles'

class SignInScreen extends React.Component {
  componentDidMount = () => {
  }

  onInputChange = (field, text) => {
    let user = this.props.store.get('user');
    user = { ...user, [field]: text }
    this.props.store.set('user')(user);
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  onPressRegisterText = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    const user = this.props.store.get('user');
    return (
      <Container style={styles.authScreen}>
        <Content>
          <Form style={styles.authForm}>
            <Item regular>
              <Input
                focus
                onChangeText={text => { this.onInputChange('email', text) }}
                value={user.email}
                placeholder="E-Mail"
                style={styles.authInput}
              />
            </Item>
            <Item regular>
              <Input
                onChangeText={text => { this.onInputChange('password', text) }}
                value={user.password}
                placeholder="Password"
                style={styles.authInput}
              />
            </Item>
            <Button block success style={styles.authButton}>
              <Text>Sign in</Text>
            </Button>
            <TouchableOpacity onPress={this.onPressRegisterText}>
              <Text style={styles.registerText}>New to BBEvents? Register here</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(SignInScreen);