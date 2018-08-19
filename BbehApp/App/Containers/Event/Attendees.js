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

class Attendees extends React.Component {
  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('attendees', selectedEvent.id, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: toast error
      } else {
        store.set('selectedEventAttendees')(response.data);
        console.log(response.data);
      }
    })
  }

  render() {
    const selectedEventAttendees = this.props.store.get('selectedEventAttendees');
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
            <Title>Attendees</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Attendees</Text>
          {/* TODO: map through attendees */}
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Attendees);
