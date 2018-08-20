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

import Store from '../../Services/Store';

import Divider from '../../Components/Divider';

import styles from './Styles/ProfileStyles';

class ProfileScreen extends React.Component {
  render() {
    const sponsor = this.props.store.get('selectedSponsor');
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Sponsors')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sponsor Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content} padder>

          <View style={styles.mainInfo}>
            {/* TODO: get media */}
            <Thumbnail large source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />

            <View style={styles.nameAndDesc}>
              <Text style={styles.userName}>{sponsor.name}</Text>
              <Text note style={styles.userPosition}>{sponsor.tier} tier sponsor</Text>
            </View>
          </View>

          <Divider marginTop={10} />

          <View style={styles.socialLinks}>
            {!!sponsor.url &&
              <Button onPress={() => Linking.openURL(sponsor.url)} transparent>
                <Icon name='link' />
              </Button>
            }
          </View>

          <Divider marginTop={10} />

          <Text style={styles.userDescription}>
            {sponsor.description}
          </Text>

        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
