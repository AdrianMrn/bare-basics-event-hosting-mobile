import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, List } from 'native-base';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';

import ListItemDetail from '../../Components/ListItemDetail';

import styles from './Styles/EventStyles';

class Sponsors extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

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
      this.setState({ loading: false });
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedSponsor')(data);
    this.props.navigation.navigate('SponsorProfile');
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
          <List>
            {/* TODO: sort sponsors by tier (gold silver bronze -> <Separator />) */}
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
            {!this.state.loading && selectedEventSponsors.map(data => {
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

export default Store.withStore(Sponsors);
