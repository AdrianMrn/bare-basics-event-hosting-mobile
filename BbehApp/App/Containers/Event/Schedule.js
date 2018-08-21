import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, List } from 'native-base';
import moment from 'moment';
import _ from 'lodash';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';

import Session from '../../Components/Session';
import Divider from '../../Components/Divider';
import DayButton from '../../Components/DayButton';

import styles from './Styles/EventStyles';

class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,

      groupedSessions: {},
      firstDay: '',
      amountOfDays: 0,
      selectedDay: 0
    }
  }

  componentDidMount() {
    this.getSessions();
  }

  getSessions = () => {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('sessions', selectedEvent.id, (error, response) => {
      if (error) {
        // TODO: toast error
        console.log(error);
        this.setState({ loading: false });
      } else {
        // creating an object with all the days and sessions ie { day1: [{sess1}, {sess3}], day2: [{sess2}, {sess3}] }
        let groupedSessions = _.groupBy(response.data, (session) => moment(session.date_start).startOf('day').format('x'));
        if (groupedSessions['Invalid date']) {
          delete groupedSessions['Invalid date'];
        }

        /* Getting the first and last days and the amount of days in between them (inclusive),
          so we can render the day buttons at the top */
        const firstDay = Math.min(...Object.keys(groupedSessions));
        const lastDay = Math.max(...Object.keys(groupedSessions));
        const amountOfDays = moment.duration(moment(lastDay).diff(moment(firstDay))).asDays() + 1;

        this.setState({
          groupedSessions,
          firstDay,
          amountOfDays,
          selectedDay: firstDay,
          loading: false
        })
      }
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedSession')(data);
    this.props.navigation.navigate('SessionDetail');
  }

  setActiveDay = day => {
    this.setState({ selectedDay: day.format('x') });
  }

  render() {
    const { loading, groupedSessions, firstDay, amountOfDays, selectedDay } = this.state;
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
            <Title>Schedule</Title>
          </Body>
          <Right />
        </Header>

        {loading &&
          <Content padder>
            <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />
          </Content>
        }

        {!loading &&
          <Content padder>

            <ScrollView style={{ height: 64, width: '100%' }} horizontal>
              {_.times(amountOfDays, (dayIndex) => {
                day = moment(firstDay).add(dayIndex, 'd');
                return (<DayButton
                  key={dayIndex}
                  day={day}
                  active={(selectedDay == day.format('x')) ? true : false}
                  setActiveDay={this.setActiveDay}
                />)
              })}
            </ScrollView>

            <Divider />

            <List style={{ marginTop: 5 }}>

              {/* TODO: map through this day's events */}


              { /* selectedEventSessions.map(data => {
                return (
                  <Session data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
                )
              }) */ }

            </List>
            {/* TODO: display sessions by day & sort by time */}
          </Content>
        }
      </Container>
    );
  }
}

export default Store.withStore(Schedule);
