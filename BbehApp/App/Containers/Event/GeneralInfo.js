import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text } from 'native-base';
import moment from 'moment';
import ViewMoreText from 'react-native-view-more-text';

import Store from '../../Services/Store';
import { } from '../../Services/Api';

import NavCard from '../../Components/NavCard';

import styles from './Styles/EventStyles';

class GeneralInfo extends React.Component {
  renderViewMore(onPress) {
    return (
      <Text style={styles.renderViewText} onPress={onPress}>Read more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text style={styles.renderViewText} onPress={onPress}>Read more</Text>
    )
  }

  render() {
    const event = this.props.store.get('selectedEvent');
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
            <Title>Event</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={styles.content}>
          {/* TODO: event logo */}
          <Text style={styles.eventName}>{event.name}</Text>
          <Text note>{event.date_start ? `${moment(event.date_start).format('Do MMM')} - ${moment(event.date_end).format('Do MMM YYYY')}` : ''}</Text>
          {event.address &&
            <Button style={{ marginVertical: 15 }} transparent iconLeft>
              {/* TODO: (in web & backend, get coordinates or goo.gl url and link to this) */}
              <Icon style={{ marginLeft: 0 }} name='pin' />
              <Text>{`${event.address}, ${event.city}, ${event.country}`}</Text>
            </Button>}

          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
          >
            <Text style={styles.eventDescription}>{event.description}</Text>
          </ViewMoreText>

          <View style={styles.navCardContainer}>
            <NavCard iconName={'chatbubbles'} navigate={() => {this.props.navigation.navigate('Speakers')}} title={'SPEAKERS'} />
            <NavCard iconName={'calendar'} navigate={() => {this.props.navigation.navigate('Schedule')}} title={'SCHEDULE'} />
            <NavCard iconName={'people'} navigate={() => {this.props.navigation.navigate('Attendees')}} title={'ATTENDEES'} />
            <NavCard iconName={'medal'} navigate={() => {this.props.navigation.navigate('Sponsors')}} title={'SPONSORS'} />
          </View>


        </Content>
      </Container>
    );
  }
}

export default Store.withStore(GeneralInfo);
