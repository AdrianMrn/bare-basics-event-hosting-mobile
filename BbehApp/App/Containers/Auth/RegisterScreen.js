import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';

import Store from '../../Services/Store';
import { apiRegister } from '../../Services/Api';

import styles from './Styles/AuthStyles'

class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      loading: false,
    }
  }

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    })
  }

  onPressLoginText = () => {
    this.props.navigation.navigate('SignIn');
  }

  onPressRegister = () => {
    this.setState({ loading: true });
    // TODO: form validation (especially email)
    const state = this.state;
    apiRegister({
      email: state.email,
      password: state.password,
      last_name: state.last_name,
      first_name: state.first_name
    }, (error, response) => {
      if (error) {
        console.log(error);
        Toast.show({
          text: 'You missed a field',
          buttonText: 'Okay',
          type: 'danger',
          duration: 5000
        });
        this.setState({ loading: false });
      } else {
        this.props.navigation.navigate('App');
      }
    });
  }

  render() {
    const state = this.state;
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
                disabled={state.loading}
              />
            </Item>
            <Item regular>
              <Input
                focus
                onChangeText={text => { this.onInputChange('first_name', text) }}
                value={state.first_name}
                placeholder="First name"
                style={styles.authInput}
                disabled={state.loading}
              />
            </Item>
            <Item regular>
              <Input
                focus
                onChangeText={text => { this.onInputChange('last_name', text) }}
                value={state.last_name}
                placeholder="Last name"
                style={styles.authInput}
                disabled={state.loading}
              />
            </Item>
            <Item regular>
              <Input
                onChangeText={text => { this.onInputChange('password', text) }}
                value={state.password}
                placeholder="Password"
                style={styles.authInput}
                secureTextEntry
                disabled={state.loading}
              />
            </Item>
            <Button onPress={this.onPressRegister} disabled={state.loading ? true : false} success={state.loading ? false : true} block style={styles.authButton}>
              {state.loading && <ActivityIndicator size="small" color="#fff" />}
              <Text>Register</Text>
            </Button>
            <TouchableOpacity disabled={state.loading} onPress={this.onPressLoginText}>
              <Text style={styles.registerText}>Already have an account? Log in here</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(SignInScreen);
