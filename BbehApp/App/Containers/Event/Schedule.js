import React from 'react';
import { ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, List, Toast } from 'native-base';
import moment from 'moment';
import _ from 'lodash';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';
import showToast from '../../Services/ShowToast';

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
      selectedDay: 0,
      selectedDayIndex: 0
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
        showToast(error);
        this.setState({ loading: false });
      } else {
        // creating an object with all the days and sessions ie { day1: [{sess1}, {sess3}], day2: [{sess2}, {sess3}] }
        const groupedSessions = _.groupBy(response.data, (session) => moment(session.date_start).startOf('day').format('x'));
        if (groupedSessions['Invalid date']) {
          delete groupedSessions['Invalid date'];
        }

        /* Getting the first and last days and the amount of days in between them (inclusive),
          so we can render the day buttons at the top */
        const firstDay = Math.min(...Object.keys(groupedSessions));
        const lastDay = Math.max(...Object.keys(groupedSessions));
        const amountOfDays = moment.duration(moment(lastDay).diff(moment(firstDay))).asDays() + 1;
        this.setState({ groupedSessions, firstDay, amountOfDays, loading: false });

        /* if we navigated here from a SessionDetail page, set selectedDay to the session's day and scroll to it,
          otherwise we're setting selectedDay to the first day of the event and not scrolling. */
        const selectedDay = this.props.navigation.getParam('selectedDay', undefined);
        if (selectedDay) {
          const selectedDayIndex = this.props.navigation.getParam('selectedDayIndex', undefined)
          this.setState({ selectedDay, selectedDayIndex });
          this.props.navigation.setParams({ selectedDay: undefined, selectedDayIndex: undefined });

          /* Calculating how much we're scrolling. 62.8 is the width of 1 DayButton component including margin. */
          /* FIXME: Find a way to scroll when the dayScrollView has rendered
            instead of using an unreliable timeout. If the user switches screen before the timeout has
            finished, the method will fire on another screen and throw an error */
          const { width } = Dimensions.get('window');
          setTimeout(() => {
            if (this._dayScrollView) {
              const buttonWidth = 62.8; //hardcoded width
              this._dayScrollView.scrollTo({ x: (selectedDayIndex * buttonWidth) - (width / 2) + (buttonWidth / 2) });
            }
          }, 100);
        } else {
          this.setState({ selectedDay: firstDay });
        }

      }
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedSession')(data);
    this.props.navigation.navigate('SessionDetail', { selectedDay: this.state.selectedDay, selectedDayIndex: this.state.selectedDayIndex });
  }

  setActiveDay = (day, dayIndex) => {
    this.setState({ selectedDay: moment(day).format('x'), selectedDayIndex: dayIndex });
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
          <Content>

            <ScrollView ref={view => this._dayScrollView = view} style={{ marginTop: 10, height: 64, width: '100%' }} horizontal>
              {_.times(amountOfDays, (dayIndex) => {
                day = moment(firstDay).add(dayIndex, 'd');
                return (
                  <DayButton
                    key={dayIndex}
                    day={day}
                    dayIndex={dayIndex}
                    active={(selectedDay == day.format('x')) ? true : false}
                    setActiveDay={this.setActiveDay}
                  />
                )
              })}
            </ScrollView>

            <Divider />

            <List style={{ marginTop: 5 }}>
              {(groupedSessions[selectedDay]) && groupedSessions[selectedDay].map(data =>
                <Session data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
              )}
            </List>
          </Content>
        }
      </Container>
    );
  }
}

export default Store.withStore(Schedule);
