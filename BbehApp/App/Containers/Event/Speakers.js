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

import styles from './Styles/EventStyles';

class Speakers extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('GeneralInfo')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Speakers</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Speakers</Text>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Speakers);
