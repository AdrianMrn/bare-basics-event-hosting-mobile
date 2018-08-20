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

import ListItemDetail from '../../Components/ListItemDetail';

import styles from './Styles/EventStyles';

class Attendees extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('attendees', selectedEvent.id, (error, response) => {
      if (error) {
        console.log(error);
        // TODO: toast error
      } else {
        store.set('selectedEventAttendees')(response.data);
      }
      this.setState({ loading: false });
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedUser')(data);
    this.props.navigation.navigate('UserProfile', { navBack: 'Attendees' });
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
          <List>
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
            {!this.state.loading && selectedEventAttendees.map(data => {
              return (
                <ListItemDetail data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
              )
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(Attendees);
