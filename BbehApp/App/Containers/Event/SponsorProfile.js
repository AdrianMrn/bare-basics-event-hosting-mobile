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
    const sponsor = this.props.store.get('selectedSponsor');
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Sponsors')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sponsor Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>{sponsor.name}</Text>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
