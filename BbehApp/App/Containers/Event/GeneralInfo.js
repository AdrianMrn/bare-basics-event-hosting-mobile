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
import { apiCheckIfAttending, apiAttendEvent, apiUnattendEvent } from '../../Services/Api';
import { mediaUrl } from '../../Services/config';

import NavCard from '../../Components/NavCard';
import Divider from '../../Components/Divider';

import styles from './Styles/EventStyles';

class GeneralInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      attending: false,
      attendeeId: 0,
    }
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    const event = this.props.store.get('selectedEvent');
    apiCheckIfAttending(event.id, (error, response) => {
      if (error) {
        showToast(error);
      } else {
        console.log(response);
        if (response.data.attending) {
          console.log(response.data);
          this.setState({ loading: false, attending: true, attendeeId: response.data.attendeeId });
        } else {
          this.setState({ loading: false, attending: false });
        }
      }
    });
  }

  attendEvent = () => {
    this.setState({ loading: true });
    const event = this.props.store.get('selectedEvent');
    apiAttendEvent(event.id, (error, response) => {
      if (error) {
        showToast(error);
      } else {
        this.setState({ loading: false, attending: true, attendeeId: response.data.attendeeId });
      }
    });
  }

  unattendEvent = () => {
    this.setState({ loading: true });
    apiUnattendEvent(this.state.attendeeId, (error, response) => {
      if (error) {
        showToast(error);
      } else {
        this.setState({ loading: false, attending: false });
      }
    });
  }

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
    const { loading, attending } = this.state;
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
            <Thumbnail square large source={{ uri: mediaUrl + event.imageUrl }} />
            <Text style={styles.eventName}>{event.name}</Text>
          </View>

          <Text style={styles.eventDate} note>{event.date_start ? `${moment(event.date_start).format('Do MMM')} - ${moment(event.date_end).format('Do MMM YYYY')}` : ''}</Text>


          <Divider marginTop={10} />

          {(!!event.coords_lon && !!event.coords_lat && event.coords_lon != 0.0000000) &&
            <Button onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${event.coords_lat},${event.coords_lon}`)} style={{ marginVertical: 15 }} transparent iconLeft>
              <Icon style={{ marginLeft: 0 }} name='pin' />
              <Text style={styles.address}>{event.address}</Text>
            </Button>
          }
          {((!event.coords_lon || (event.coords_lon == 0.0000000)) && !!event.address) &&
            <View style={{ marginVertical: 15, flexDirection: 'row' }}>
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

          {this.state.attending &&
            <View>
              <View style={styles.navCardContainer}>
                <NavCard iconName={'chatbubbles'} navigate={() => { this.props.navigation.navigate('Speakers') }} title={'SPEAKERS'} />
                <NavCard iconName={'calendar'} navigate={() => { this.props.navigation.navigate('Schedule') }} title={'SCHEDULE'} />
                <NavCard iconName={'people'} navigate={() => { this.props.navigation.navigate('Attendees') }} title={'ATTENDEES'} />
                <NavCard iconName={'medal'} navigate={() => { this.props.navigation.navigate('Sponsors') }} title={'SPONSORS'} />
              </View>

              <Button style={{ marginTop: 10 }} onPress={this.unattendEvent} block disabled={this.state.loading ? true : false} danger={this.state.loading ? false : true}>
                {!!this.state.loading && <ActivityIndicator size="small" color="#fff" />}
                {!this.state.loading && <Icon name="close" />}
                <Text>Unattend</Text>
              </Button>
            </View>
          }

          {!this.state.attending &&
            <Button style={{ marginTop: 20 }} onPress={this.attendEvent} block disabled={this.state.loading ? true : false} primary={this.state.loading ? false : true}>
              {!!this.state.loading && <ActivityIndicator size="small" color="#fff" />}
              {!this.state.loading && <Icon name="add" />}
              <Text>Join</Text>
            </Button>
          }


        </Content>
      </Container>
    );
  }
}

export default Store.withStore(GeneralInfo);
