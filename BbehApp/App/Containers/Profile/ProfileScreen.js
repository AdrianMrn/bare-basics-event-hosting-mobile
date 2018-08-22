import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Label, Text, Toast } from 'native-base';

import Store from '../../Services/Store';
import { } from '../../Services/Api';

import styles from './Styles/ProfileStyles';

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      company: '',
      position: '',
      description: '',
      linkedin: '',
      facebook: '',
      website: '',
      twitter: '',
      // TODO: probably need another for the user avatar?

      loading: true,
    }
  }

  componentDidMount = () => {
    // TODO: get user info from API, fill state with user details, toast error etc etc

    this.setState({ loading: false });
  }

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    })
  }

  saveProfile = () => {
    this.setState({ loading: true });
    // TODO: send profile to API, display toast on error etc etc


    this.setState({ loading: false });
    Toast.show({
      text: 'Profile has been saved',
      buttonText: 'Okay',
      type: 'success',
      duration: 5000
    });
  }

  render() {
    const state = this.state;
    const { loading } = state;
    return (
      <Container style={styles.authScreen}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>My Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.saveProfile} disabled={loading ? true : false}>
              <Icon name="checkmark" />
            </Button>
          </Right>
        </Header>

        {loading &&
          <Content padder>
            <ActivityIndicator size="large" />
          </Content>
        }

        {!loading &&
          <Content padder>
            <Form style={styles.form}>

              <Item stackedLabel>
                <Label>First name</Label>
                <Input
                  onChangeText={text => { this.onInputChange('first_name', text) }}
                  value={state.first_name}
                  disabled={loading}
                />
              </Item>

              {/* TODO: add other inputs */}


            </Form>
          </Content>
        }
      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
