import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, List } from 'native-base';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';

import Session from '../../Components/Session';

import styles from './Styles/EventStyles';

class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('sessions', selectedEvent.id, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: toast error
      } else {
        store.set('selectedEventSessions')(response.data);
      }
      this.setState({ loading: false });
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedSession')(data);
    this.props.navigation.navigate('SessionDetail');
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
          <List>
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
            {!this.state.loading && selectedEventSessions.map(data => {
              return (
                <Session data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
              )
            })}
          </List>
          {/* TODO: display sessions by day & sort by time */}
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Schedule);
