import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, Thumbnail } from 'native-base';
import moment from 'moment';
import ViewMoreText from 'react-native-view-more-text';

import Store from '../../Services/Store';
import { } from '../../Services/Api';

import NavCard from '../../Components/NavCard';
import Divider from '../../Components/Divider';

import styles from './Styles/EventStyles';

class GeneralInfo extends React.Component {
  renderViewMore(onPress) {
    return (
      <Text style={styles.renderViewText} onPress={onPress}>Show more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text style={styles.renderViewText} onPress={onPress}>Show less</Text>
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
          <View style={styles.mainInfo}>
            {/* TODO: get media */}
            <Thumbnail square large source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />
            <Text style={styles.eventName}>{event.name}</Text>
          </View>

          <Text style={styles.eventDate} note>{event.date_start ? `${moment(event.date_start).format('Do MMM')} - ${moment(event.date_end).format('Do MMM YYYY')}` : ''}</Text>


          <Divider marginTop={10} />

          {event.address &&
            <Button style={{ marginVertical: 15 }} transparent iconLeft>
              {/* TODO: (in web & backend, get coordinates and link to google maps page of this),
                if (!coords_lat) --> do not show Button, just display address in <Text> (if it exists) */}
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

          {/* TODO: if the user is not attending this event yet, don't display the navCards but 
            display an "Attend Event" block Button at the bottom of the page */}

          <View style={styles.navCardContainer}>
            <NavCard iconName={'chatbubbles'} navigate={() => { this.props.navigation.navigate('Speakers') }} title={'SPEAKERS'} />
            <NavCard iconName={'calendar'} navigate={() => { this.props.navigation.navigate('Schedule') }} title={'SCHEDULE'} />
            <NavCard iconName={'people'} navigate={() => { this.props.navigation.navigate('Attendees') }} title={'ATTENDEES'} />
            <NavCard iconName={'medal'} navigate={() => { this.props.navigation.navigate('Sponsors') }} title={'SPONSORS'} />
          </View>


        </Content>
      </Container>
    );
  }
}

export default Store.withStore(GeneralInfo);
