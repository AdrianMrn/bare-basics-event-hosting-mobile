import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Input, Text, Content, List, Item } from "native-base";
import { debounce } from 'debounce';

import Store from '../../Services/Store';
import { apiQueryEvents } from '../../Services/Api';
import showToast from '../../Services/ShowToast';

import Event from '../../Components/Event';

import styles from './Styles/ExploreEventsStyles';

class ExploreEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      queryResult: [],
      searchQuery: ''
    }
  }

  fetchEvents = debounce(() => {
    if (this.state.searchQuery) {
      this.setState({ loading: true });
      apiQueryEvents(this.state.searchQuery, (error, response) => {
        if (error) {
          showToast(error);
        } else {
          this.setState({ queryResult: response.data });
        }
        this.setState({ loading: false });
      });
    }
  }, 300);

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    });

    this.fetchEvents();
  }

  navigateToEvent = eventData => {
    this.props.store.set('selectedEvent')(eventData);
    this.props.navigation.navigate('GeneralInfo');
  }

  render() {
    const { queryResult, searchQuery } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('EventOverview')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Item regular style={styles.searchBox}>
              <Input
                placeholder="Search"
                onChangeText={text => { this.onInputChange('searchQuery', text) }}
                value={searchQuery}
              />
            </Item>
          </Body>
          <Right>
            <Button
              transparent
              onPress={this.fetchEvents}
            >
              <Icon name="ios-search" />
            </Button>
          </Right>
        </Header>

        {/* <Header searchBar rounded>
          <Item>
            <Button onPress={() => this.props.navigation.navigate('EventOverview')}}>
              <Icon name="arrow-back" />
            </Button>
          </Item>

          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button onPress={this.fetchEvents} transparent>
            <Text>Search</Text>
          </Button>
        </Header> */}

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
