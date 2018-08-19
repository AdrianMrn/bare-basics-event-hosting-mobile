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
import { apiGetEventExtraDetails } from '../../Services/Api';

import styles from './Styles/EventStyles';

class Speakers extends React.Component {
  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('speakers', selectedEvent.id, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: toast error
      } else {
        store.set('selectedEventSpeakers')(response.data);
        console.log(response.data);
      }
    })
  }

  render() {
    const selectedEventSpeakers = this.props.store.get('selectedEventSpeakers');
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
          {/* TODO: map through speakers */}
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Speakers);
