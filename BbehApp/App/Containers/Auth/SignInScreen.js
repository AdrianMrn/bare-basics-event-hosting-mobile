import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';
import Image from 'react-native-scalable-image';

import Store from '../../Services/Store';
import { apiLogin } from '../../Services/Api';
import showToast from '../../Services/ShowToast';
import images from '../../Themes/Images';

import styles from './Styles/AuthStyles'

class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,

      logoWidth: 0
    }
  }

  componentDidMount = () => {
    const { width } = Dimensions.get('window');
    this.setState({ logoWidth: width - 60 });
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
    const state = this.state;
    apiLogin({
      email: state.email,
      password: state.password
    }, (error, response) => {
      if (error) {
        showToast(error);
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
          <Image
            width={this.state.logoWidth}
            source={images.textlogo}
            style={styles.logo}
          />
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
                onChangeText={text => { this.onInputChange('password', text) }}
                value={state.password}
                placeholder="Password"
                style={styles.authInput}
                secureTextEntry
                disabled={state.loading}
              />
            </Item>
            <Button onPress={this.onPressLogin} block disabled={state.loading ? true : false} success={state.loading ? false : true} style={styles.authButton}>
              {state.loading && <ActivityIndicator size="small" color="#fff" />}
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
