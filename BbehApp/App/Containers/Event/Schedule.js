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

class Schedule extends React.Component {
  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('sessions', selectedEvent.id, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: toast error
      } else {
        store.set('selectedEventSessions')(response.data);
        console.log(response.data);
      }
    })
  }

  render() {
    const selectedEventSessions = this.props.store.get('selectedEventSessions');
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
            <Title>Schedule</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Schedule</Text>
          {/* TODO: display sessions by date */}
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Schedule);
