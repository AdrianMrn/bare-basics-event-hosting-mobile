import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, List, Toast } from 'native-base';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';

import ListItemDetail from '../../Components/ListItemDetail';

import styles from './Styles/EventStyles';

class Speakers extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('speakers', selectedEvent.id, (error, response) => {
      if (error) {
        Toast.show({
          text: 'Something went wrong, sorry!',
          buttonText: 'Okay',
          type: 'danger',
          duration: 5000
        });
      } else {
        store.set('selectedEventSpeakers')(response.data);
      }
      this.setState({ loading: false });
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedUser')(data);
    this.props.navigation.navigate('UserProfile', { navBack: 'Speakers' });
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

        <Content>
          <List>
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
            {!this.state.loading && selectedEventSpeakers.map(data => {
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

export default Store.withStore(Speakers);
