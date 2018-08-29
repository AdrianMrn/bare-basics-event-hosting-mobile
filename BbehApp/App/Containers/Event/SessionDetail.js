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
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, Thumbnail, List, Toast } from 'native-base';
import moment from 'moment';

import Store from '../../Services/Store';
import { apiGetSessionSpeakers } from '../../Services/Api';
import showToast from '../../Services/ShowToast';

import Divider from '../../Components/Divider';
import ListItemDetail from '../../Components/ListItemDetail';

import styles from './Styles/ProfileStyles';

class SessionDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      speakers: []
    }
  }

  componentDidMount() {
    apiGetSessionSpeakers(this.props.store.get('selectedSession').id, (error, response) => {
      if (error) {
        showToast(error);
        this.setState({ loading: false });
      } else {
        this.setState({ speakers: response.data, loading: false, });
      }
    })
  }

  navigateToDetail = data => {
    this.props.store.set('selectedUser')(data);
    this.props.navigation.navigate('UserProfile', { navBack: 'SessionDetail' });
  }

  back = () => {
    const navBack = this.props.navigation.getParam('navBack', undefined);
    console.log(navBack);
    if (navBack) {
      this.props.navigation.setParams({ navBack: undefined });
      this.props.navigation.navigate(navBack);
    } else {
      this.props.navigation.navigate('Schedule', {
        selectedDay: this.props.navigation.getParam('selectedDay', undefined),
        selectedDayIndex: this.props.navigation.getParam('selectedDayIndex', undefined),
      });
    }
  }

  render() {
    const session = this.props.store.get('selectedSession');
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.back}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Session Details</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content} padder>

          <Text style={styles.userName}>{session.name}</Text>
          <Text note style={styles.userPosition}>
            {!!session.date_start && <Text note>{`${moment(session.date_start).format('Do MMM, H:mm')} - ${moment(session.date_end).format('H:mm')}`}</Text>}
          </Text>

          <Divider marginTop={10} />

          <Text style={styles.userDescription}>
            {session.description}
          </Text>

          <Divider marginTop={20} />

          <List style={styles.sessionSpeakerList}>
            {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
            {!this.state.loading && this.state.speakers.map(data => {
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

export default Store.withStore(SessionDetail);
