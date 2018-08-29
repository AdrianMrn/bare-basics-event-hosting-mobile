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
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, Thumbnail, Toast, Separator, List } from 'native-base';

import Store from '../../Services/Store';
import { apiGetUserProfile, apiGetUserSessions } from '../../Services/Api';
import showToast from '../../Services/ShowToast';
import { mediaUrl } from '../../Services/config';

import Divider from '../../Components/Divider';
import Session from '../../Components/Session';

import styles from './Styles/ProfileStyles';

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,

      loadingSessions: true,
      userSessions: [],

      user: {
        id: '',
        first_name: '',
        last_name: '',
        company: '',
        position: '',
        description: '',
        linkedin: '',
        facebook: '',
        website: '',
        twitter: '',
        email: ''
      }
    }
  }

  componentDidMount() {
    const store = this.props.store;
    const userId = store.get('selectedUser').user_id
    const eventId = store.get('selectedEvent').id

    apiGetUserProfile(userId, (error, response) => {
      if (error) {
        showToast(error);
        this.setState({ loading: false });
      } else {
        this.setState({ user: response.data, loading: false });
      }
    });

    apiGetUserSessions(userId, eventId, (error, response) => {
      if (error) {
        showToast(error);
        this.setState({ loadingSessions: false });
      } else {
        this.setState({ loadingSessions: false, userSessions: response.data });
      }
    });
  }

  // Navigate to Session detail
  navigateToDetail = data => {
    this.props.store.set('selectedSession')(data);
    this.props.navigation.navigate('SessionDetail', { navBack: 'UserProfile' });
  }

  render() {
    const user = this.state.user;
    const { userSessions, loadingSessions } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate(this.props.navigation.getParam('navBack', 'GeneralInfo'))}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>User Profile</Title>
          </Body>
          <Right />
        </Header>

        {this.state.loading &&
          <Content style={styles.content} padder>
            <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />
          </Content>}

        {!this.state.loading &&
          <Content>
            <View style={styles.padder}>

              <View style={styles.mainInfo}>
                <Thumbnail large source={{ uri: mediaUrl + user.imageUrl }} />

                <View style={styles.nameAndDesc}>
                  <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
                  <Text note style={styles.userPosition}>{user.position} {(!!user.company && !!user.position) ? 'at' : ''} {user.company}</Text>
                </View>
              </View>

              <Divider marginTop={10} />

              <View style={styles.socialLinks}>
                {!!user.facebook &&
                  <Button onPress={() => Linking.openURL(user.facebook)} transparent >
                    <Icon name='logo-facebook' />
                  </Button>
                }
                {!!user.linkedin &&
                  <Button onPress={() => Linking.openURL(user.linkedin)} transparent >
                    <Icon name='logo-linkedin' />
                  </Button>
                }
                {!!user.twitter &&
                  <Button onPress={() => Linking.openURL(user.twitter)} transparent >
                    <Icon name='logo-twitter' />
                  </Button>
                }
                {!!user.website &&
                  <Button onPress={() => Linking.openURL(user.website)} transparent>
                    <Icon name='link' />
                  </Button>
                }
              </View>

              {(!!user.facebook || user.linkedin || user.twitter || user.website) && < Divider marginTop={10} />}

              <Text style={styles.userDescription}>
                {user.description}
              </Text>
            </View>

            {loadingSessions &&
              <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />
            }

            {(!loadingSessions && userSessions) &&
              <View>
                <Divider marginTop={20} />
                <List style={{ marginTop: 10 }}>
                  <Separator style={styles.separator} bordered>
                    <Text style={styles.separatorText}>SESSIONS AT THIS EVENT</Text>
                  </Separator>

                  {!!userSessions && userSessions.map(data =>
                    <Session data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
                  )}
                </List>
              </View>
            }

          </Content>
        }

      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
