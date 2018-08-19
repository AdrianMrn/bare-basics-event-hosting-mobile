import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text } from 'native-base';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';

import styles from './Styles/EventStyles';

class Sponsors extends React.Component {
  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('sponsors', selectedEvent.id, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: toast error
      } else {
        store.set('selectedEventSponsors')(response.data);
        console.log(response.data);
      }
    })
  }

  render() {
    const selectedEventSponsors = this.props.store.get('selectedEventSponsors');
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
            <Title>Sponsors</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Sponsors</Text>
          {/* TODO: map through sponsors by tier (gold silver bronze) */}
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Sponsors);
