import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Input, Text, Content, List, Item } from "native-base";
import { debounce } from 'debounce';

import Store from '../../Services/Store';
import { apiQueryEvents, apiGetNextTenEvents } from '../../Services/Api';
import showToast from '../../Services/ShowToast';

import Event from '../../Components/Event';

import styles from './Styles/ExploreEventsStyles';

class ExploreEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      blockInput: true,
      loading: true,
      queryResult: [],
      searchQuery: '',
      showDisclaimer: false,
      searchTouched: false
    }
  }

  componentDidMount = () => {
    this.getNextTenEvents();
  }

  getNextTenEvents = () => {
    apiGetNextTenEvents((error, response) => {
      if (error) {
        showToast(error);
      } else {
        this.setState({ queryResult: response.data });
      }
      this.setState({ loading: false, blockInput: false });
    });

  }

  fetchEvents = debounce(() => {
    if (this.state.searchQuery && this.state.searchQuery.length >= 3) {
      this.setState({ loading: true, showDisclaimer: false });
      apiQueryEvents(this.state.searchQuery, (error, response) => {
        if (error) {
          showToast(error);
        } else {
          this.setState({ queryResult: response.data });
        }
        this.setState({ loading: false, showDisclaimer: false });
      });
    } else {
      this.setState({ showDisclaimer: true });
    }
  }, 500);

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    });

    if (this.state.searchQuery.length < 3) {
      this.setState({ showDisclaimer: true, searchTouched: true, queryResult: [] });
    }

    this.fetchEvents();
  }

  navigateToEvent = eventData => {
    this.props.store.set('selectedEvent')(eventData);
    this.props.navigation.navigate('GeneralInfo');
  }

  render() {
    const { queryResult, searchQuery, showDisclaimer, searchTouched, blockInput } = this.state;

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
            <Item style={styles.searchBox}>
              <Input
                style={{ color: 'white' }}
                placeholderTextColor='#FFF'
                placeholder="Search"
                onChangeText={text => { this.onInputChange('searchQuery', text) }}
                value={searchQuery}
                autoFocus={true}
                disabled={blockInput}
              />
            </Item>
          </Body>
          <Right />
        </Header>

        <Content>
          {(showDisclaimer && searchTouched) &&
            <Text style={styles.disclaimerText}>Enter at least 3 characters to start searching</Text>
          }

          <List>
            {queryResult.map(data => {
              return (
                <Event data={data} navigateToEvent={this.navigateToEvent} key={data.id} />
              )
            })}
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
          </List>

        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ExploreEvents);
