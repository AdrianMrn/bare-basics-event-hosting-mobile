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
      password: '',
      loading: false
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
    this.setState({ loading: true });
    // TODO: form validation (especially email)
    const state = this.state;
    apiLogin({
      email: state.email,
      password: state.password
    }, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: display error (toast?)
        this.setState({ loading: false });
      } else {
        this.props.navigation.navigate('App');
      }
    });
  }

  render() {
    const state = this.state;
    console.log(state);
    return (
      <Container style={styles.authScreen}>
        <Content padder>
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
            <Button onPress={this.onPressLogin} block disabled={state.loading ? true: false} success={state.loading ? false : true} style={styles.authButton}>
              <Text>Sign in</Text>
            </Button>
            <TouchableOpacity disabled={state.loading} onPress={this.onPressRegisterText}>
              <Text style={styles.registerText}>New to BBEvents? Register here</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(SignInScreen);
