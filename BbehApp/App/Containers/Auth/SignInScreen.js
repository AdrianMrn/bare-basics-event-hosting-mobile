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
import { apiLogin } from '../../../App/Services/Api';

import styles from './Styles/AuthStyles'

class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    })
  }

  onPressRegisterText = () => {
    this.props.navigation.navigate('Register');
  }

  onPressLogin = () => {
    // TODO: form validation (especially email)
    apiLogin({ email: this.state.email, password: this.state.password }, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      });

    /* await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App'); */
  }

  render() {
    const state = this.state;
    return (
      <Container style={styles.authScreen}>
        <Content>
          <Form style={styles.authForm}>
            <Item regular>
              <Input
                focus
                onChangeText={text => { this.onInputChange('email', text) }}
                value={state.email}
                placeholder="E-Mail"
                style={styles.authInput}
              />
            </Item>
            <Item regular>
              <Input
                onChangeText={text => { this.onInputChange('password', text) }}
                value={state.password}
                placeholder="Password"
                style={styles.authInput}
                secureTextEntry
              />
            </Item>
            <Button onPress={this.onPressLogin} block success style={styles.authButton}>
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
