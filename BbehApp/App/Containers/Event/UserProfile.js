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
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, Thumbnail, Toast } from 'native-base';

import Store from '../../Services/Store';
import { apiGetUserProfile } from '../../Services/Api';

import Divider from '../../Components/Divider';

import styles from './Styles/ProfileStyles';

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
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
    apiGetUserProfile(this.props.store.get('selectedUser').user_id, (error, response) => {
      if (error) {
        Toast.show({
          text: 'Something went wrong, sorry!',
          buttonText: 'Okay',
          type: 'danger',
          duration: 5000
        });
        this.setState({ loading: false });
      } else {
        this.setState({ user: response.data, loading: false });
      }
    })
  }

  render() {
    const user = this.state.user;
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
          <Content style={styles.content} padder>

            <View style={styles.mainInfo}>
              {/* TODO: get media */}
              <Thumbnail large source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />

              <View style={styles.nameAndDesc}>
                <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
                <Text note style={styles.userPosition}>{user.position} {!!user.company ? 'at' : ''} {user.company}</Text>
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

            <Divider marginTop={10} />

            <Text style={styles.userDescription}>
              {user.description}
            </Text>

            {/* TODO: if this user has talks at this event, display them */}

          </Content>
        }

      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
