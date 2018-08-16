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

  _RegisterAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  onPressLoginText = () => {
    this.props.navigation.navigate('SignIn');
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
                focus
                onChangeText={text => { this.onInputChange('first_name', text) }}
                value={user.first_name}
                placeholder="First name"
                style={styles.authInput}
              />
            </Item>
            <Item regular>
              <Input
                focus
                onChangeText={text => { this.onInputChange('last_name', text) }}
                value={user.last_name}
                placeholder="Last name"
                style={styles.authInput}
              />
            </Item>
            <Item regular>
              <Input
                onChangeText={text => { this.onInputChange('password', text) }}
                value={user.password}
                placeholder="Password"
                style={styles.authInput}
                secureTextEntry
              />
            </Item>
            <Button block success style={styles.authButton}>
              <Text>Register</Text>
            </Button>
            <TouchableOpacity onPress={this.onPressLoginText}>
              <Text style={styles.registerText}>Already have an account? Log in here</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(SignInScreen);
