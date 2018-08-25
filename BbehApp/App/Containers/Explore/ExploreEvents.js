import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Thumbnail, Button, Body, Content, Text, Card, CardItem, List, ListItem, Separator, Toast } from "native-base";

import Store from '../../Services/Store';
import { } from '../../Services/Api';
import showToast from '../../Services/ShowToast';

import Event from '../../Components/Event';

import styles from './Styles/ExploreEventsStyles';

class ExploreEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      queryResult: []
    }
  }

  fetchEvents = () => {
    this.setState({ loading: true });
    /* apiFetchAttendingEvents((error, response) => {
        if (error) {
            showToast(error);
        } else {
            const store = this.props.store;
            store.set('attendingUpcomingEvents')(response.data.upcomingEvents);
            store.set('attendingPastEvents')(response.data.pastEvents);
        }
        this.setState({ loading: false });
    }); */
  }

  navigateToEvent = eventData => {
    this.props.store.set('selectedEvent')(eventData);
    this.props.navigation.navigate('GeneralInfo');
  }

  render() {
    const { queryResult } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Explore Events</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          {/* TODO: search box with submit button */}
          <List>
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
            {!this.state.loading && queryResult.map(data => {
              return (
                <Event data={data} navigateToEvent={this.navigateToEvent} key={data.id} />
              )
            })}
          </List>

        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ExploreEvents);
