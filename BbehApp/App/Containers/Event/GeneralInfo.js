import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking
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
            <Title>Event Detail</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={styles.content}>
          <View style={styles.mainInfo}>
            {/* TODO: make sure image works on prod */}
            <Thumbnail square large source={{ uri: event.imageUrl }} />
            <Text style={styles.eventName}>{event.name}</Text>
          </View>

          <Text style={styles.eventDate} note>{event.date_start ? `${moment(event.date_start).format('Do MMM')} - ${moment(event.date_end).format('Do MMM YYYY')}` : ''}</Text>


          <Divider marginTop={10} />

          {(!!event.coords_lon && !!event.coords_lat && event.coords_lon != 0.0000000) &&
            <Button onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${event.coords_lat},${event.coords_lon}`)} style={{ marginVertical: 15 }} transparent iconLeft>
              <Icon style={{ marginLeft: 0 }} name='pin' />
              <Text>{event.address}</Text>
            </Button>
          }
          {((!event.coords_lon || (event.coords_lon == 0.0000000)) && !!event.address) &&
            <View style={{marginVertical: 15, flexDirection: 'row' }}>
              <Icon style={{ marginLeft: 0, marginRight: 10 }} name='pin' />
              <Text>{event.address}</Text>
            </View>
          }

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
